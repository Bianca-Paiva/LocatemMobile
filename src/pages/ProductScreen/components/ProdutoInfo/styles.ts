import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  produtoInfoWrapper: {
    flexDirection: 'column',
    gap: 14,
  },
  titulo: {
    fontSize: 18, // Usamos um valor fixo seguro no lugar do clamp(15px, 2.5vw, 20px)
    fontWeight: '700',
    color: '#0a0a0a',
    lineHeight: 24,
    margin: 0,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  starIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  ratingValor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  ratingCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  brandTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0a0a0a',
    backgroundColor: '#f3f4f6',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginLeft: 4,
    overflow: 'hidden',
  },
  precoBox: {
    flexDirection: 'row',
    alignItems: 'baseline', // Garante o alinhamento baseline no mobile
    gap: 3,
    paddingTop: 10,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  precoPrefix: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  precoValor: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  precoDia: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 2, 
  },
  opcaoGrupo: {
    flexDirection: 'column',
    gap: 8,
  },
  opcaoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#141D23',
    margin: 0,
  },
  required: {
    color: '#E11D48',
    fontSize: 14,
  },

  botoesOpcao: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  btnOpcao: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#FFFFFF', // Fallback para var(--color-bg-input)
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOpcaoAtivo: {
    borderColor: '#F9C01A',
    backgroundColor: '#fffbebae',
  },
  btnOpcaoText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  btnOpcaoTextAtivo: {
    color: '#0a0a0a',
    fontWeight: '700',
  },
  seletoresRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-end',
  },
  seletorFlex: {
    flex: 1, // Faz com que os itens dividam 50% do espaço
  },
  ctasContainer: {
    flexDirection: 'column',
    gap: 10,
    paddingTop: 6,
  },
  btnLocar: {
    width: '100%',
    height: 46,
    backgroundColor: '#F9C01A',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLocarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  linhaSecundaria: {
    flexDirection: 'row',
    gap: 10,
  },
  btnCarrinho: {
    flex: 1,
    height: 46,
    backgroundColor: '#F5E3B3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  btnCarrinhoText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6E5000',
  },
});