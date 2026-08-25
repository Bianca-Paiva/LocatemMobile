import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 16,
  },
  resumoContainer: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    flexWrap: 'wrap',
  },
  mediaBox: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    minWidth: 90,
  },
  mediaNumero: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0a0a0a',
    lineHeight: 44,
  },
  mediaEstrelasRow: {
    flexDirection: 'row',
  },
  totalText: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
  },
  distribuicaoContainer: {
    flex: 1,
    minWidth: 180,
    flexDirection: 'column',
    gap: 6,
  },
  barraLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barraLabel: {
    fontSize: 12,
    color: '#6b7280',
    width: 10,
    textAlign: 'right',
  },
  barraTrack: {
    flex: 1,
    height: 7,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barraFill: {
    height: '100%',
    backgroundColor: '#F9C01A',
    borderRadius: 4,
  },
  barraPercent: {
    fontSize: 11,
    color: '#9ca3af',
    width: 28,
  },
  listaAvaliacoes: {
    flexDirection: 'column',
  },
  avaliacaoItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
    flexDirection: 'column',
    gap: 8,
  },
  avaliacaoItemUltimo: {
    borderBottomWidth: 0,
  },
  avaliacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  avaliacaoMeta: {
    flexDirection: 'column',
    gap: 2,
  },
  avaliacaoNome: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  avaliacaoTempo: {
    fontSize: 11,
    color: '#9ca3af',
  },
  estrelasRow: {
    flexDirection: 'row',
    gap: 2,
  },
  avaliacaoTexto: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
  fotosRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  fotoThumb: {
    width: 72,
    height: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    resizeMode: 'cover',
  },
  avaliacaoFooter: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnUtil: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F9C01A', // Equivalente à --color-primary
    backgroundColor: 'transparent',
  },
  btnUtilAtivo: {
    backgroundColor: '#fef3c7',
  },
  btnUtilText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  btnUtilTextAtivo: {
    color: '#4D4732',
    fontWeight: '600',
  },
  likeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  utilCount: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  btnVerMais: {
    width: '100%',
    height: 44, // Aumentado para melhor UX de toque
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  btnVerMaisText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
});