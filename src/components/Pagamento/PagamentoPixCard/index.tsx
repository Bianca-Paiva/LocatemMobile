import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, Check, Copy } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';

import colors from '../../../theme/colors';
import styles from './styles';

interface PagamentoPixCardProps {
  codigoPix: string;
  copiado: boolean;
  onCopiarCodigo: () => void;
  /** Controla o estado de expiração — o mesmo cronômetro exibido no Resumo do Pedido. */
  expirado: boolean;
  /** Chamado quando o usuário pede um novo QR Code após a expiração. */
  onGerarNovoQrCode: () => void;
}

const instrucoesPix = [
  'Abra o app do seu banco e escolha pagar com PIX',
  'Escaneie o QR Code ou cole o código copiado',
  'Confirme o pagamento no app do seu banco',
];

export function PagamentoPixCard({
  codigoPix,
  copiado,
  onCopiarCodigo,
  expirado,
  onGerarNovoQrCode,
}: PagamentoPixCardProps) {
  if (expirado) {
    return (
      <View style={styles.card}>
        <View style={styles.expiradoContainer}>
          <View style={styles.expiradoIconWrapper}>
            <AlertTriangle size={32} color={colors.error} />
          </View>

          <Text style={styles.expiradoTitulo}>Tempo Expirado</Text>

          <Text style={styles.expiradoTexto}>
            O código PIX expirou. Gere um novo código para continuar.
          </Text>

          <TouchableOpacity style={styles.btnGerarNovoQrCode} onPress={onGerarNovoQrCode}>
            <Text style={styles.btnGerarNovoQrCodeTexto}>Gerar Novo QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.qrSection}>
        <View style={styles.qrWrapper}>
          <QRCode value={codigoPix} size={200} />
        </View>

        <Text style={styles.labelQrcode}>Escaneie o QR Code com seu app bancário.</Text>
      </View>

      <View style={styles.campo}>
        <Text style={styles.label}>Código Pix (Copia e Cola)</Text>

        <View style={styles.inputCodigo}>
          <Text style={styles.codigoTexto} numberOfLines={1}>
            {codigoPix}
          </Text>

          <TouchableOpacity
            style={[styles.btnCopiar, copiado && styles.btnCopiarAtivo]}
            onPress={onCopiarCodigo}
          >
            {copiado ? (
              <Check size={16} color={colors.success} />
            ) : (
              <Copy size={16} color={colors.linkColor} />
            )}
            <Text style={[styles.btnCopiarTexto, copiado && styles.btnCopiarTextoAtivo]}>
              {copiado ? 'Copiado!' : 'Copiar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.instrucoesContainer}>
        <Text style={styles.label}>Como pagar com PIX:</Text>

        {instrucoesPix.map((instrucao, index) => (
          <View key={instrucao} style={styles.itemInstrucao}>
            <Text style={styles.numeroInstrucao}>{index + 1}</Text>
            <Text style={styles.textoInstrucao}>{instrucao}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
