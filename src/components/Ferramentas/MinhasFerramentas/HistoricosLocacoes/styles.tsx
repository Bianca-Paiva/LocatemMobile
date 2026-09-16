import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#E9EAEC',

    borderRadius: 16,

    overflow: 'hidden',
  },

  // Estado expandido: borda neutra discreta
  cardExpandido: {
    borderColor: '#D9DDE3',
  },

  cabecalho: {
    padding: 14,

    gap: 12,
  },

  linhaTopo: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 12,
  },

  miniatura: {
    width: 48,

    height: 48,

    borderRadius: 10,

    overflow: 'hidden',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,

    borderColor: '#E7E7E7',

    justifyContent: 'center',

    alignItems: 'center',
  },

  miniaturaImagem: {
    width: '100%',

    height: '100%',
  },

  topoTextos: {
    flex: 1,

    gap: 4,
  },

  nomeFerramenta: {
    fontSize: 14,

    fontWeight: '700',

    color: '#0A0A0A',

    lineHeight: 18,
  },

  locatarioInfo: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,
  },

  locatarioNome: {
    flex: 1,

    fontSize: 13,

    color: '#0A0A0A',
  },

  linhaStatus: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    gap: 12,
  },

  valor: {
    fontSize: 14,

    fontWeight: '800',
  },

  valorPositivo: {
    color: '#137333',
  },

  valorNeutro: {
    color: '#6B7280',
  },

  // ── Área expandida ────────────────────────────────────────────────
  detalhes: {
    backgroundColor: '#F9FAFB',

    borderTopWidth: 1,

    borderTopColor: '#EEF0F2',

    paddingHorizontal: 14,

    paddingVertical: 16,

    gap: 16,
  },

  grade: {
    gap: 14,
  },

  itemDetalhe: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    gap: 10,
  },

  circuloMotivo: {
    width: 26,

    height: 26,

    borderRadius: 13,

    borderWidth: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  textoDetalhe: {
    flex: 1,

    gap: 2,
  },

  rotulo: {
    fontSize: 11,

    fontWeight: '700',

    letterSpacing: 0.4,

    color: '#6B7280',
  },

  valorDetalhe: {
    fontSize: 13,

    fontWeight: '600',

    color: '#0A0A0A',
  },

  rodapeDetalhes: {
    gap: 12,

    paddingTop: 14,

    borderTopWidth: 1,

    borderTopColor: '#E9EAEC',
  },

  linkVerDetalhes: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    gap: 10,
  },

  linkTitulo: {
    fontSize: 13,

    fontWeight: '700',

    color: '#0A0A0A',
  },

  linkDescricao: {
    fontSize: 12,

    color: '#6B7280',
  },

  botaoVerDetalhes: {
    alignSelf: 'flex-start',

    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

    paddingHorizontal: 16,

    paddingVertical: 10,

    borderRadius: 999,

    backgroundColor: '#FFCA00',
  },

  botaoVerDetalhesPressionado: {
    backgroundColor: '#E6B800',
  },

  botaoVerDetalhesTexto: {
    fontSize: 13,

    fontWeight: '700',

    color: '#0A0A0A',
  },
});
