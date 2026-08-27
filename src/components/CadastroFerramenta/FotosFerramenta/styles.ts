import { StyleSheet } from 'react-native';

import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 16,
  },

  dropzone: {
    width: '100%',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D8D8D8',
    borderRadius: 14,
    backgroundColor: '#FCFCFC',
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  dropzoneErro: {
    borderColor: colors.error,
  },

  iconeUpload: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  textoPrincipal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
    textAlign: 'center',
  },

  textoSecundario: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 16,
    textAlign: 'center',
  },

  link: {
    color: '#B8860B',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },

  badge: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    backgroundColor: '#F1F1F1',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },

  // =========================================
  // GRADE DE FOTOS
  // =========================================

  grade: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  miniatura: {
    flex: 1,
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    position: 'relative',
  },

  miniaturaArrastando: {
    opacity: 0.75,
    transform: [
      {
        scale: 1.04,
      },
    ],
  },

  imagem: {
    width: '100%',
    height: '100%',
  },

  // =========================================
  // CAPA
  // =========================================

  selo: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    zIndex: 10,
  },

  seloTexto: {
    color: colors.textDark,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // =========================================
  // REMOVER
  // =========================================

  botaoRemover: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  // =========================================
  // INDICADOR DE ARRASTE
  // =========================================

  indicadorArraste: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  // =========================================
  // ADICIONAR MAIS
  // =========================================

  botaoAdicionarMais: {
    width: '100%',
    height: 46,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  botaoAdicionarMaisTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textDark,
  },

  error: {
    fontSize: 13,
    color: colors.error,
    fontWeight: '500',
  },
});