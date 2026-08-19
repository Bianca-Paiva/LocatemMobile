import { Text, View } from 'react-native';

import type { ResumoReservaCalculado } from '../../../pages/Reservas/SolicitarReserva/SolicitarReserva.types';

import { styles } from './styles';

interface ResumoReservaProps {
  resumo: ResumoReservaCalculado;
}

export default function ResumoReserva({
  resumo,
}: ResumoReservaProps) {
  const {
    dataEntregaFormatada,
    dataDevolucaoFormatada,
    diarias,
    entregaHorarioFormatado,
    devolucaoHorarioFormatado,
    aluguelFormatado,
    freteFormatado,
    valorFormatado,
  } = resumo;

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>
        Resumo da reserva
      </Text>

      <View style={styles.linhaPeriodo}>
        <Text style={styles.rotuloPeriodo}>
          Período
        </Text>

        <Text style={styles.valorPeriodo}>
          {dataEntregaFormatada} - {dataDevolucaoFormatada}{' '}

          <Text style={styles.diarias}>
            ({diarias}{' '}
            {diarias === 1
              ? 'diária'
              : 'diárias'}
            )
          </Text>
        </Text>
      </View>

      <View style={styles.boxes}>
        <View style={styles.box}>
          <Text style={styles.boxLabel}>
            Entrega
          </Text>

          <Text style={styles.boxValor}>
            {entregaHorarioFormatado}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxLabel}>
            Devolução
          </Text>

          <Text style={styles.boxValor}>
            {devolucaoHorarioFormatado}
          </Text>
        </View>
      </View>

      <View style={styles.divisor} />

      <View style={styles.linha}>
        <Text style={styles.rotulo}>
          Aluguel
        </Text>

        <Text style={styles.valor}>
          {aluguelFormatado}
        </Text>
      </View>

      <View style={styles.linha}>
        <Text style={styles.rotulo}>
          Frete
        </Text>

        <Text style={styles.valor}>
          {freteFormatado}
        </Text>
      </View>

      <View style={styles.divisorForte} />

      <View style={styles.linhaDestaque}>
        <Text style={styles.rotuloDestaque}>
          Valor Total
        </Text>

        <Text style={styles.valorDestaque}>
          {valorFormatado}
        </Text>
      </View>

      <View style={styles.aviso}>
        {/* Ícone SVG */}
        <View style={styles.avisoIconeContainer}>
          <Text style={styles.avisoIcone}>
            ⓘ
          </Text>
        </View>

        <View style={styles.avisoTexto}>
          <Text style={styles.paragrafoAviso}>
            A devolução será coletada no mesmo endereço
            informado acima. Caso seja necessário alterar
            o local de coleta, isso poderá ser feito
            posteriormente na reserva.
          </Text>

          <Text style={styles.paragrafoAviso}>
            Você só será cobrado quando a reserva for
            aceita pelo locador.
          </Text>
        </View>
      </View>
    </View>
  );
}