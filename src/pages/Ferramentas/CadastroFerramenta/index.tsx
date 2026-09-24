import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../../routes/AppRoutes';

import SecaoCard from '../../../components/Ferramentas/CadastroFerramenta/SecaoCard';
import SecaoModal from '../../../components/Ferramentas/CadastroFerramenta/SecaoModal';
import InformacoesBasicas from '../../../components/Ferramentas/CadastroFerramenta/InformacoesBasicas';
import EnderecoRetirada from '../../../components/Ferramentas/CadastroFerramenta/EnderecoRetirada';
import DescricaoFerramenta from '../../../components/Ferramentas/CadastroFerramenta/DescricaoFerramenta';
import EspecificacoesTecnicasForm from '../../../components/Ferramentas/CadastroFerramenta/EspecificacoesTecnicasForm';
import FotosFerramenta from '../../../components/Ferramentas/CadastroFerramenta/FotosFerramenta';
import Precificacao from '../../../components/Ferramentas/CadastroFerramenta/Precificacao';
import AcessoriosInclusos from '../../../components/Ferramentas/CadastroFerramenta/AcessoriosInclusos';
import AprovacaoLocacao from '../../../components/Ferramentas/CadastroFerramenta/AprovacaoLocacao';
import CalendarioDisponibilidade from '../../../components/Ferramentas/CadastroFerramenta/CalendarioDisponibilidade';

import { useFerramentas } from '../../../context/Ferramentas/FerramentasContext';

import { cadastrarFerramenta, editarFerramenta as editarFerramentaApi, listarCategorias, } from '../../../services/ferramentaService';

import {
  criarFormularioVazio,
  validarFormulario,
  secaoEstaCompleta,
  secaoTemErro,
  SECOES,
} from './types';

import type {
  CadastroFerramentaFormState,
  SecaoId,
} from './types';

import styles from './styles';
import colors from '../../../theme/colors';
import { moedaParaNumero } from '../../../utils/Formatacao/masks';

import { SafeAreaView } from 'react-native-safe-area-context';

type CadastroFerramentaRoute = RouteProp<
  RootStackParamList,
  'CadastroFerramentaScreen'
>;

export default function CadastroFerramentaScreen() {
  const navigation = useNavigation();
  const route = useRoute<CadastroFerramentaRoute>();

  const {
    adicionarFerramenta,
    editarFerramenta,
    obterFerramenta,
  } = useFerramentas();

  // Se veio um "ferramentaId" pela navegação,
  // a tela entra em modo edição.
  const ferramentaId = route.params?.ferramentaId;

  const ferramentaEmEdicao = ferramentaId
    ? obterFerramenta(ferramentaId)
    : undefined;

  const modoEdicao = Boolean(ferramentaEmEdicao);

  const [form, setForm] = useState<CadastroFerramentaFormState>(
    () => ferramentaEmEdicao ?? criarFormularioVazio(),
  );

  const [secaoAberta, setSecaoAberta] = useState<SecaoId | null>(null);

  const [tentouPublicar, setTentouPublicar] = useState(false);

  // Enquanto o usuário está arrastando uma foto,
  // o ScrollView da seção de fotos fica desabilitado.
  const [arrastandoFoto, setArrastandoFoto] = useState(false);

  // Só recalcula os erros quando o formulário muda.
  const errosCalculados = useMemo(
    () => validarFormulario(form),
    [form],
  );

  const erros = tentouPublicar ? errosCalculados : {};

  const totalCompletas = modoEdicao
    ? SECOES.length
    : SECOES.filter(
      (s) => secaoEstaCompleta(s.id, form),
    ).length;

  const handleChangeCampo = <
    K extends keyof CadastroFerramentaFormState
  >(
    campo: K,
    valor: CadastroFerramentaFormState[K],
  ) => {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  };

  const handleToggleDiaIndisponivel = (dataIso: string) => {
    setForm((atual) => {
      const jaIndisponivel =
        atual.diasIndisponiveis.includes(dataIso);

      return {
        ...atual,
        diasIndisponiveis: jaIndisponivel
          ? atual.diasIndisponiveis.filter(
            (d) => d !== dataIso,
          )
          : [...atual.diasIndisponiveis, dataIso],
      };
    });
  };

  const handlePublicar = async () => {
    // ------------------------------------------
    // MODO EDIÇÃO
    // ------------------------------------------
    if (modoEdicao && ferramentaId) {
      try {
        await editarFerramenta(ferramentaId, form);

        Alert.alert(
          'Ferramenta atualizada!',
          'As alterações foram salvas.',
          [
            {
              text: 'OK',
              onPress: () => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                }
              },
            },
          ],
        );
      } catch (erro) {
        console.error(
          'ERRO AO EDITAR FERRAMENTA:',
          erro,
        );

        Alert.alert(
          'Erro ao editar',
          erro instanceof Error
            ? erro.message
            : 'Não foi possível atualizar a ferramenta.',
        );
      }

      return;
    }

    // ------------------------------------------
    // NOVO CADASTRO
    // ------------------------------------------

    const errosAtuais = validarFormulario(form);

    setTentouPublicar(true);

    const temErro = Object.keys(errosAtuais).length > 0;

    if (temErro) {
      const primeiraComErro = SECOES.find(
        (s) => secaoTemErro(s.id, errosAtuais),
      );

      if (primeiraComErro) {
        setSecaoAberta(primeiraComErro.id);
      }

      Alert.alert(
        'Revise o formulário',
        'Alguns campos obrigatórios ainda precisam ser preenchidos. Os cards com pendência estão marcados em vermelho.',
      );

      return;
    }

    // ------------------------------------------
    // NOVO CADASTRO PELA API
    // ------------------------------------------
    try {
      const categorias = await listarCategorias();

      const categoriaSelecionada = categorias.find(
        (categoria: { id: number; nome: string }) =>
          categoria.nome === form.categoria,
      );

      if (!categoriaSelecionada) {
        Alert.alert(
          'Erro',
          'A categoria selecionada não foi encontrada.',
        );

        return;
      }

      await adicionarFerramenta(form);

      Alert.alert(
        'Ferramenta cadastrada!',
        'Sua ferramenta foi salva com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => {
              setForm(criarFormularioVazio());
              setTentouPublicar(false);

              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
          },
        ],
      );
    } catch (erro) {
      console.error(
        'ERRO AO CADASTRAR FERRAMENTA:',
        erro,
      );

      Alert.alert(
        'Erro ao cadastrar',
        erro instanceof Error
          ? erro.message
          : 'Não foi possível cadastrar a ferramenta.',
      );
    }
  };

  const renderConteudoSecao = (id: SecaoId) => {
    switch (id) {
      case 'fotos':
        return (
          <FotosFerramenta
            fotos={form.fotos}
            onChange={(fotos) =>
              handleChangeCampo('fotos', fotos)
            }
            error={erros.fotos}
            shake={
              tentouPublicar &&
              Boolean(erros.fotos)
            }
            onDragStateChange={setArrastandoFoto}
          />
        );

      case 'informacoesBasicas':
        return (
          <InformacoesBasicas
            form={form}
            onChangeCampo={handleChangeCampo}
            erros={erros}
            shake={tentouPublicar}
          />
        );

      case 'descricao':
        return (
          <DescricaoFerramenta
            value={form.descricao}
            onChange={(valor) =>
              handleChangeCampo('descricao', valor)
            }
            error={erros.descricao}
            shake={
              tentouPublicar &&
              Boolean(erros.descricao)
            }
          />
        );

      case 'especificacoes':
        return (
          <EspecificacoesTecnicasForm
            especificacoes={form.especificacoes}
            onChange={(especificacoes) =>
              handleChangeCampo(
                'especificacoes',
                especificacoes,
              )
            }
            erroPublicacao={erros.especificacoes}
          />
        );

      case 'endereco':
        return (
          <EnderecoRetirada
            form={form}
            onChangeCampo={handleChangeCampo}
            erros={erros}
            shake={tentouPublicar}
          />
        );

      case 'precificacao':
        return (
          <Precificacao
            valorDiaria={form.valorDiaria}
            caucao={form.caucao}
            onChangeValorDiaria={(valor) =>
              handleChangeCampo(
                'valorDiaria',
                valor,
              )
            }
            onChangeCaucao={(valor) =>
              handleChangeCampo(
                'caucao',
                valor,
              )
            }
            error={erros.valorDiaria}
            shake={
              tentouPublicar &&
              Boolean(erros.valorDiaria)
            }
          />
        );

      case 'acessorios':
        return (
          <AcessoriosInclusos
            acessorios={form.acessorios}
            onChange={(acessorios) =>
              handleChangeCampo(
                'acessorios',
                acessorios,
              )
            }
          />
        );

      case 'aprovacao':
        return (
          <AprovacaoLocacao
            tipoAprovacao={form.tipoAprovacao}
            onChange={(valor) =>
              handleChangeCampo(
                'tipoAprovacao',
                valor,
              )
            }
            error={erros.tipoAprovacao}
            shake={
              tentouPublicar &&
              Boolean(erros.tipoAprovacao)
            }
          />
        );

      case 'calendario':
        return (
          <CalendarioDisponibilidade
            diasIndisponiveis={
              form.diasIndisponiveis
            }
            onToggleDia={
              handleToggleDiaIndisponivel
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
      
      <View style={styles.tela}>
        {/* <View style={styles.cabecalho}>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() =>
              navigation.canGoBack() &&
              navigation.goBack()
            }
            accessibilityLabel="Voltar"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={22}
              color={colors.textDark}
            />
          </TouchableOpacity>

          <View style={styles.cabecalhoTextos}>
            <Text style={styles.titulo}>
              {modoEdicao
                ? 'Editar Ferramenta'
                : 'Cadastrar Ferramenta'}
            </Text>

            <Text style={styles.subtitulo}>
              Toque em cada card para preencher a seção
            </Text>
          </View>
        </View> */}

        <ScrollView
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {SECOES.map((secao) => (
              <SecaoCard
              key={secao.id}
              icone={secao.icone}
              titulo={secao.titulo}
              obrigatorio={modoEdicao ? false : secao.obrigatorio}
              completo={
              modoEdicao
              ? true
              : secaoEstaCompleta(secao.id, form)
            }
            comErro={
            !modoEdicao &&
            tentouPublicar &&
            secaoTemErro(
            secao.id,
            errosCalculados,
            )
            }
            onPress={() =>
            setSecaoAberta(secao.id)
            }
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.barraInferior}>
          <Text style={styles.progresso}>
            {totalCompletas} de {SECOES.length} seções completas
          </Text>

          <TouchableOpacity
            style={styles.botaoPublicar}
            onPress={handlePublicar}
            activeOpacity={0.85}
          >
            <Text style={styles.botaoPublicarTexto}>
              {modoEdicao
                ? 'Salvar Alterações'
                : 'Publicar Ferramenta'}
            </Text>
          </TouchableOpacity>
        </View>

        {SECOES.map((secao) => (
          <SecaoModal
            key={secao.id}
            visible={secaoAberta === secao.id}
            onClose={() => setSecaoAberta(null)}
            icone={secao.icone}
            titulo={secao.titulo}
            obrigatorio={secao.obrigatorio}
            subtitulo={secao.subtitulo}
            scrollEnabled={
              secao.id === 'fotos'
                ? !arrastandoFoto
                : true
            }
          >
            {renderConteudoSecao(secao.id)}
          </SecaoModal>
        ))}
      </View>
    </SafeAreaView>
  );
}