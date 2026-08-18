import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  vendedorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 19,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'column',
    gap: 12, // Gap funciona bem nas versões mais recentes do React Native
  },
  vendedorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // Metade da largura/altura para fazer o círculo perfeito
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarInitials: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
  },
  vendedorInfo: {
    flex: 1,
  },
  vendedorNome: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0a0a',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  starIcon: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },
  ratingValor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0a0a0a',
  },
  ratingCount: {
    fontSize: 11,
    color: '#6b7280',
  },
  locacoes: {
    fontSize: 12,
    color: '#6b7280',
  },
  verificadoBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificadoIcon: {
    width: 20,
    height: 20,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  btnVerPerfil: {
    width: '100%',
    height: 36, // Altura adaptada para o mínimo de acessibilidade touch
    backgroundColor: '#fff',
    borderRadius: 999, // Arredondamento total (pílula)
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  btnVerPerfilText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
});
