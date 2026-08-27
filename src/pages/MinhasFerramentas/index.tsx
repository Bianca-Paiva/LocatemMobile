// Tela "Minhas Ferramentas" — acessível pelo item de mesmo nome no menu
// lateral do Header. Mostra o cabeçalho padrão (busca + carrinho + conta),
// o botão "Cadastrar Ferramenta" (que leva pra tela de cadastro) e, logo
// abaixo, a lista de ferramentas já cadastradas (ou o estado vazio).

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/AppRoutes';

import Header from '../../components/Header';
import EstadoVazio from '../../components/MinhasReservas/EstadoVazio/EstadoVazio';
import FerramentaCard from '../../components/MinhasFerramentas/FerramentaCard';

import { useFerramentas } from '../../context/FerramentasContext';
import colors from '../../theme/colors';
import styles from './styles';

export default function MinhasFerramentasScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    ferramentas,
    removerFerramenta,
    alternarStatusFerramenta,
  } = useFerramentas();

  const irParaCadastro = () => {
    navigation.navigate('CadastroFerramentaScreen');
  };

  const editarFerramenta = (id: string) => {
    navigation.navigate('CadastroFerramentaScreen', {
      ferramentaId: id,
    });
  };

  return (
    <View style={styles.tela}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <View style={styles.cabecalhoTextos}>
            <Text
              style={styles.titulo}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Minhas Ferramentas
            </Text>

            <Text
              style={styles.subtitulo}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Gerencie as ferramentas que você anuncia para locação.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={irParaCadastro}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons
              name="plus"
              size={16}
              color={colors.textDark}
            />

            <Text style={styles.botaoCadastrarTexto}>
              Cadastrar Ferramenta
            </Text>
          </TouchableOpacity>
        </View>

        {ferramentas.length === 0 ? (
          <EstadoVazio
            titulo="Você ainda não anunciou nenhuma ferramenta"
            descricao='Clique em "Cadastrar Ferramenta" para publicar seu primeiro anúncio.'
          />
        ) : (
          <View style={styles.lista}>
            {ferramentas.map((ferramenta) => (
              <FerramentaCard
                key={ferramenta.id}
                ferramenta={ferramenta}
                onEditar={editarFerramenta}
                onRemover={removerFerramenta}
                onAlternarStatus={alternarStatusFerramenta}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}