import type { ReservaData } from '../../pages/Reservas/MinhasReservas/MinhasReservas.types';
import { View, Text } from 'react-native';

interface ResumoSolicitacaoCardProps {
  reserva: ReservaData;
}

function parseDataBr(dataBr: string): Date | null {
  if (!dataBr) return null;

  const [dia, mes, ano] = dataBr.split('/').map(Number);

  if (!dia || !mes || !ano) return null;

  return new Date(ano, mes - 1, dia);
}

function calcularDiarias(dataInicio: string, dataFim: string): number {
  const inicio = parseDataBr(dataInicio);
  const fim = parseDataBr(dataFim);

  if (!inicio || !fim) return 0;

  const diffMs = fim.getTime() - inicio.getTime();

  return Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

export default function ResumoSolicitacaoCard({
  reserva,
}: ResumoSolicitacaoCardProps) {
  const { produto, dataInicio, dataFim, valor } = reserva;

  const diarias = calcularDiarias(dataInicio, dataFim);

  return (
    <View>
      <Text>Resumo da solicitação</Text>

      <View>
        <Text>Status</Text>
        <View>
          <View />
          <Text>Em análise</Text>
        </View>
      </View>

      <View>
        <Text>Ferramenta</Text>
        <Text>{produto}</Text>
      </View>

      <View>
        <Text>Período</Text>
        <View>
          <Text>
            {dataInicio} - {dataFim}
          </Text>

          <Text>
            {diarias} {diarias === 1 ? 'diária' : 'diárias'}
          </Text>
        </View>
      </View>

      <View>
        <Text>Valor</Text>
        <Text>{valor}</Text>
      </View>
    </View>
  );
}