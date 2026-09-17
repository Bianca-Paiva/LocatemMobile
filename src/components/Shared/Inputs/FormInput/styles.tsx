import { StyleSheet } from 'react-native';
import colors from '../../../../theme/colors';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',

    color: '#141D23',
  },

  /**
   * Container: é ele — e só ele — que desenha borda, fundo, altura e padding.
   * Antes esses mesmos valores estavam repetidos no `input` abaixo, o que
   * produzia uma caixa dentro da outra (borda dupla) e empurrava o texto para
   * fora quando havia prefixo.
   */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    height: 48,

    paddingHorizontal: 14,

    borderRadius: 10,

    borderWidth: 1.5,
    borderColor: colors.border,

    backgroundColor: colors.bgInput,
  },

  /** O TextInput só cuida do texto: sem borda, sem fundo, sem padding próprio. */
  input: {
    flex: 1,

    height: '100%',

    padding: 0,

    fontSize: 14,

    color: '#141D23',
  },

  erro: {
    borderColor: '#E11D48',

    shadowColor: '#E11D48',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,

    elevation: 2,
  },

  sucesso: {
    borderColor: '#22C55E',
  },

  inputFocused: {
    borderColor: colors.primary,
  },

  inputRowDesabilitado: {
    opacity: 0.6,

    backgroundColor: colors.border,
  },

  required: {
    color: '#E11D48',

    fontSize: 16,

    lineHeight: 16,
  },

  error: {
    fontSize: 13,

    color: '#E11D48',

    fontWeight: '500',
  },

  /**
   * Multiline: o container solta a altura fixa e passa a crescer com o texto,
   * ancorando o conteúdo no topo.
   */
  rowMultiline: {
    height: undefined,

    alignItems: 'flex-start',

    paddingVertical: 12,
  },

  inputMultiline: {
    height: undefined,

    alignSelf: 'stretch',

    textAlignVertical: 'top',
  },

  prefixo: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginRight: 8,
  },
});
