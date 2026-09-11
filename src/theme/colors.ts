// Paleta central do app — espelha 1:1 as variáveis CSS (--color-*) do :root
// da versão Web (src/styles/global.css). Sempre importe as cores daqui em
// vez de usar hexadecimais soltos nos arquivos de estilo, pra manter os
// componentes Web e Mobile visualmente iguais.
export default {
  primary: '#FFCA00',
  primaryHover: '#F2CB00',
  primaryLight: '#FFE97A',
  primarySoft: '#FFF6C7',
  secondary: '#F0C000C0',

  bgMain: '#F9FAFB',
  bgInput: '#F9FAFB',
  bgCard: '#FFFFFF',
  bgApp: '#FAFAFA',

  textDark: '#0A0A0A',
  textMuted: '#6B7280',
  textMuted2: '#9CA3AF',

  border: '#F3F4F6',
  borderLight: '#F1F1F1',

  error: '#E11D48',
  errorBg: '#FDECED',
  errorBgHover: '#FBD6D9',

  success: '#22C55E',
  successBg: '#F2FBF5',
  successBorder: '#BFE8CF',

  linkColor: '#0077FF',
  amber: '#8A6D00',
};
