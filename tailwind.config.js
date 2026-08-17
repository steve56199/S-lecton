module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js}',
    './components/**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors
        'surface': '#f8f9fb',
        'surface-dim': '#d9dadc',
        'surface-bright': '#f8f9fb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f3f4f6',
        'surface-container': '#edeef0',
        'surface-container-high': '#e7e8ea',
        'surface-container-highest': '#e1e2e4',
        'on-surface': '#191c1e',
        'on-surface-variant': '#3d4949',
        'inverse-surface': '#2e3132',
        'inverse-on-surface': '#f0f1f3',

        // Primary colors (Teal)
        'primary': '#006768',
        'on-primary': '#ffffff',
        'primary-container': '#008284',
        'on-primary-container': '#f3fffe',
        'inverse-primary': '#70d6d8',
        'primary-fixed': '#8df3f5',
        'primary-fixed-dim': '#70d6d8',
        'on-primary-fixed': '#002020',
        'on-primary-fixed-variant': '#004f51',

        // Secondary colors (Navy)
        'secondary': '#446277',
        'on-secondary': '#ffffff',
        'secondary-container': '#c5e4fd',
        'on-secondary-container': '#49667b',
        'secondary-fixed': '#c8e6ff',
        'secondary-fixed-dim': '#accae3',
        'on-secondary-fixed': '#001e2f',
        'on-secondary-fixed-variant': '#2c4a5e',

        // Tertiary colors (Grey)
        'tertiary': '#5b5c5c',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#747575',
        'on-tertiary-container': '#fdfcfc',
        'tertiary-fixed': '#e3e2e2',
        'tertiary-fixed-dim': '#c6c6c6',
        'on-tertiary-fixed': '#1a1c1c',
        'on-tertiary-fixed-variant': '#464747',

        // Error colors
        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Outline and backgrounds
        'outline': '#6d7979',
        'outline-variant': '#bdc9c9',
        'surface-tint': '#00696b',
        'background': '#f8f9fb',
        'on-background': '#191c1e',
        'surface-variant': '#e1e2e4'
      },

      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px'
      },

      spacing: {
        'unit': '8px',
        'gutter': '24px',
        'section-gap': '48px'
      },

      maxWidth: {
        'container-max': '1280px'
      },

      fontFamily: {
        'display-lg': ['Manrope', 'sans-serif'],
        'headline-lg': ['Manrope', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'body-lg': ['Manrope', 'sans-serif'],
        'body-md': ['Manrope', 'sans-serif'],
        'label-md': ['Manrope', 'sans-serif'],
        'timer-display': ['Manrope', 'sans-serif']
      },

      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '600' }],
        'timer-display': ['20px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '700' }]
      },

      boxShadow: {
        'sm': '0px 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0px 4px 12px rgba(37, 67, 87, 0.08)',
        'inner': 'inset 0 0 0 1px rgba(109, 121, 121, 0.15)'
      }
    }
  },
  plugins: []
}
