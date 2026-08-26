import { StyleSheet } from 'react-native';
import colors from '../../../theme/colors';

export default StyleSheet.create({
  wrapper: {
    gap: 20,
    width: '100%',
  },
  linhaCep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  campoCep: {
    flex: 1,
  },
  linkCepDesconhecido: {
    marginTop: 30,
  },
  linkCepDesconhecidoTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.linkColor,
    textDecorationLine: 'underline',
  },
  linhaCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.linkColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxMarcado: {
    backgroundColor: colors.linkColor,
  },
  checkboxMarca: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  checkboxTexto: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.linkColor,
  },
  wrapperDevolucao: {
    gap: 20,
    marginTop: 4,
  },
  tituloDevolucao: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.linkColor,
  },
});
