import type { ReactNode } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConfirmModalProps {
  /** Controla a exibição do modal. Quando `false`, nada é renderizado. */
  open: boolean;
  /** Título exibido no cabeçalho do modal. */
  title: string;
  /** Texto (ou conteúdo) explicando a ação que está prestes a ser confirmada. */
  message: ReactNode;
  /** Rótulo do botão de confirmação. Padrão: "Confirmar". */
  confirmLabel?: string;
  /** Rótulo do botão de cancelamento. Padrão: "Cancelar". */
  cancelLabel?: string;
  /** Executa a ação que estava pendente de confirmação. */
  onConfirm: () => void;
  /** Fecha o modal sem executar nenhuma ação (toque em Cancelar, no "X", no overlay ou botão/gesto de voltar do Android). */
  onCancel: () => void;
  /**
   * "perigo" estiliza o botão de confirmação como uma ação destrutiva (vermelho) — usado em exclusões e
   * cancelamentos. "padrao" usa a cor primária da marca. Padrão: "perigo".
   */
  variant?: 'perigo' | 'padrao';
  confirmButtonStyle?: 'padrao' | 'negativo';
}

// TODO: se o projeto já tiver um arquivo de tema (ex.: src/theme/colors.ts), troque estas
// constantes pelos tokens existentes em vez de duplicar os valores aqui.
const COLOR_PRIMARY = '#F2C230';
const COLOR_PRIMARY_TEXT = '#141D23';
const COLOR_TEXT_DARK = '#1A1A1A';
const COLOR_TEXT_MUTED = '#6B7280';
const COLOR_DANGER = '#CC3333';
const COLOR_DANGER_BG = '#FDF1F1';
const COLOR_BORDER = '#E5E7EB';
const COLOR_NEUTRO_BG = '#F3F4F6';

/**
 * Modal de confirmação genérico e reutilizável. Usado sempre que uma ação (cancelar, excluir, sair da conta
 * etc.) precisa de uma confirmação explícita do usuário antes de ser executada.
 * Todo o conteúdo (título, mensagem, textos dos botões e callbacks) vem por props — este componente não
 * conhece a ação específica que está confirmando.
 *
 * Adaptado do ConfirmModal web (CSS Modules) para React Native/Expo:
 * - `useEffect` + listener de `keydown` (Esc) → prop `onRequestClose` do `Modal`, que o RN já dispara no
 *   botão físico/gesto de voltar do Android.
 * - `div` com `onClick`/`stopPropagation` para overlay e card → dois `Pressable` aninhados; o de dentro tem
 *   `onPress` vazio só para impedir que o toque "vaze" para o overlay e feche o modal.
 * - Ícones `lucide-react` (`AlertTriangle`, `X`) → `@expo/vector-icons` (`Ionicons`), já incluso no Expo.
 * - `BtnNeutro`/`BtnNegativo` do projeto web não existem aqui; os botões foram recriados com `Pressable`.
 *   Se o LocatemMobile já tiver componentes de botão equivalentes, prefira importá-los no lugar destes.
 */
export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'perigo',
  confirmButtonStyle = 'padrao',
}: ConfirmModalProps) {
  const usarConfirmacaoNegativa =
    confirmButtonStyle === 'negativo' ||
    confirmLabel === 'Remover' ||
    confirmLabel === 'Sim, cancelar' ||
    confirmLabel === 'Sair';

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.modal} onPress={() => {}}>
          <View style={styles.cabecalho}>
            <View style={styles.tituloWrapper}>
              {variant === 'perigo' && (
                <View style={styles.iconePerigo}>
                  <Ionicons name="warning-outline" size={20} color={COLOR_DANGER} />
                </View>
              )}
              <Text style={styles.titulo} numberOfLines={2}>
                {title}
              </Text>
            </View>
            <Pressable
              style={styles.btnFechar}
              onPress={onCancel}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Fechar"
            >
              <Ionicons name="close" size={20} color={COLOR_TEXT_MUTED} />
            </Pressable>
          </View>

          <View style={styles.mensagemWrapper}>
            {typeof message === 'string' ? <Text style={styles.mensagem}>{message}</Text> : message}
          </View>

          <View style={styles.acoes}>
            <Pressable style={[styles.botaoAcao, styles.botaoNeutro]} onPress={onCancel}>
              <Text style={styles.textoBotaoNeutro}>{cancelLabel}</Text>
            </Pressable>

            {usarConfirmacaoNegativa ? (
              <Pressable style={[styles.botaoAcao, styles.botaoNegativo]} onPress={onConfirm}>
                <Text style={styles.textoBotaoNegativo}>{confirmLabel}</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.botaoAcao, variant === 'perigo' ? styles.botaoPerigo : styles.botaoPrimario]}
                onPress={onConfirm}
              >
                <Text style={variant === 'perigo' ? styles.textoBotaoPerigo : styles.textoBotaoPrimario}>
                  {confirmLabel}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLOR_BORDER,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: { elevation: 6 },
    }),
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  tituloWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  iconePerigo: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLOR_DANGER_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    flexShrink: 1,
    fontSize: 18,
    fontWeight: '800',
    color: COLOR_TEXT_DARK,
  },
  btnFechar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mensagemWrapper: {
    marginBottom: 22,
  },
  mensagem: {
    fontSize: 14.5,
    lineHeight: 22,
    color: COLOR_TEXT_MUTED,
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoAcao: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoNeutro: {
    backgroundColor: COLOR_NEUTRO_BG,
  },
  textoBotaoNeutro: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR_TEXT_DARK,
  },
  botaoPrimario: {
    backgroundColor: COLOR_PRIMARY,
  },
  textoBotaoPrimario: {
    fontSize: 14,
    fontWeight: '700',
    color: COLOR_PRIMARY_TEXT,
  },
  botaoPerigo: {
    backgroundColor: COLOR_DANGER,
  },
  textoBotaoPerigo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  botaoNegativo: {
    backgroundColor: COLOR_DANGER,
  },
  textoBotaoNegativo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
