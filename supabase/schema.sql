-- Module 2 : profils utilisateur
-- À exécuter une fois dans le SQL Editor du tableau de bord Supabase.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  prenom text not null,
  nom text not null,
  date_naissance date,
  telephone text,
  telephone_verifie boolean not null default false,
  kyc_statut text not null default 'en_attente'
    check (kyc_statut in ('en_attente', 'verifie', 'refuse')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Lecture de son propre profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Création de son propre profil"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Mise à jour de son propre profil"
  on public.profiles for update
  using (auth.uid() = id);
