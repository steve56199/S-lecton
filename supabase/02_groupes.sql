-- Module 3 : groupes, membres et invitations
-- À exécuter une fois dans le SQL Editor du tableau de bord Supabase,
-- après avoir déjà exécuté supabase/schema.sql (Module 2).

-- Les références pointent vers profiles (et non directement auth.users)
-- afin de pouvoir afficher les noms des membres, et parce qu'un profil
-- complet est requis avant de créer ou rejoindre un groupe.

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  description text,
  confidentiel boolean not null default false,
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'membre' check (role in ('admin', 'membre')),
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create table if not exists public.group_invites (
  token uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete cascade,
  expires_at timestamptz not null default (now() + interval '30 days'),
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.groups enable row level security;
alter table public.group_members enable row level security;
alter table public.group_invites enable row level security;

-- Fonctions utilitaires (contournent RLS de façon contrôlée pour éviter
-- toute récursion des politiques sur group_members).

create or replace function public.is_group_member(p_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.group_members
    where group_id = p_group_id and user_id = auth.uid()
  );
$$;

create or replace function public.is_group_admin(p_group_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.group_members
    where group_id = p_group_id and user_id = auth.uid() and role = 'admin'
  );
$$;

-- groups

create policy "Lecture des groupes dont on est membre"
  on public.groups for select
  using (public.is_group_member(id) or created_by = auth.uid());

create policy "Création d'un groupe par son créateur"
  on public.groups for insert
  with check (auth.uid() = created_by);

-- group_members

create policy "Lecture des membres de ses propres groupes"
  on public.group_members for select
  using (public.is_group_member(group_id));

create policy "Le créateur du groupe s'ajoute comme administrateur"
  on public.group_members for insert
  with check (
    user_id = auth.uid()
    and role = 'admin'
    and exists (
      select 1 from public.groups g
      where g.id = group_id and g.created_by = auth.uid()
    )
  );

-- group_invites

create policy "L'administrateur gère les invitations de son groupe"
  on public.group_invites for select
  using (public.is_group_admin(group_id));

create policy "L'administrateur crée des invitations"
  on public.group_invites for insert
  with check (created_by = auth.uid() and public.is_group_admin(group_id));

-- Rejoindre un groupe via un jeton d'invitation (fonction sécurisée :
-- valide le jeton puis insère l'appartenance, sans exposer group_members
-- ou group_invites à une politique d'écriture plus permissive).

create or replace function public.join_group_via_invite(p_token uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group_id uuid;
begin
  select group_id into v_group_id
  from public.group_invites
  where token = p_token
    and not revoked
    and expires_at > now();

  if v_group_id is null then
    raise exception 'invitation_invalide';
  end if;

  insert into public.group_members (group_id, user_id, role)
  values (v_group_id, auth.uid(), 'membre')
  on conflict (group_id, user_id) do nothing;

  return v_group_id;
end;
$$;

-- Aperçu d'un groupe à partir d'un jeton d'invitation, avant adhésion
-- (n'expose que le nom et la description, jamais les membres).

create or replace function public.apercu_invitation(p_token uuid)
returns table (group_id uuid, nom text, description text)
language sql
security definer
set search_path = public
as $$
  select g.id, g.nom, g.description
  from public.group_invites gi
  join public.groups g on g.id = gi.group_id
  where gi.token = p_token
    and not gi.revoked
    and gi.expires_at > now();
$$;

grant execute on function public.join_group_via_invite(uuid) to authenticated;
grant execute on function public.apercu_invitation(uuid) to authenticated, anon;
