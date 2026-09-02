import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../routes/AppRoutes';

import SecaoCard from '../../components/CadastroFerramenta/SecaoCard';
import SecaoModal from '../../components/CadastroFerramenta/SecaoModal';
import InformacoesBasicas from '../../components/CadastroFerramenta/InformacoesBasicas';
import EnderecoRetirada from '../../components/CadastroFerramenta/EnderecoRetirada';
import DescricaoFerramenta from '../../components/CadastroFerramenta/DescricaoFerramenta';
import EspecificacoesTecnicasForm from '../../components/CadastroFerramenta/EspecificacoesTecnicasForm';
import FotosFerramenta from '../../components/CadastroFerramenta/FotosFerramenta';
import Precificacao from '../../components/CadastroFerramenta/Precificacao';
import AcessoriosInclusos from '../../components/CadastroFerramenta/AcessoriosInclusos';
import AprovacaoLocacao from '../../components/CadastroFerramenta/AprovacaoLocacao';
import CalendarioDisponibilidade from '../../components/CadastroFerramenta/CalendarioDisponibilidade';

import { useFerramentas } from '../../context/FerramentasContext';
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
import colors from '../../theme/colors';

type CadastroFerramentaRoute = RouteProp<RootStackParamList, 'CadastroFerramentaScreen'>;

export default function CadastroFerramentaScreen() {
  const navigation = useNavigation();
  const route = useRoute<CadastroFerramentaRoute>();
  const { adicionarFerramenta, editarFerramenta, obterFerramenta } = useFerramentas();

  // Se veio um "ferramentaId" pela navegação (clique em "Editar" na tela
  // Minhas Ferramentas), a tela entra em modo edição: carrega os dados
  // daquela ferramenta no formulário e, ao publicar, atualiza em vez de criar.
  const ferramentaId = route.params?.ferramentaId;
  const ferramentaEmEdicao = ferramentaId ? obterFerramenta(ferramentaId) : undefined;
  const modoEdicao = Boolean(ferramentaEmEdicao);

  const [form, setForm] = useState<CadastroFerramentaFormState>(
    () => ferramentaEmEdicao ?? criarFormularioVazio(),
  );
  const [secaoAberta, setSecaoAberta] = useState<SecaoId | null>(null);
  const [tentouPublicar, setTentouPublicar] = useState(false);

  // Enquanto o usuário está arrastando uma foto pra reordenar, o ScrollView
  // do SecaoModal de "fotos" fica com scroll desabilitado, pra não disputar
  // o toque com o gesto de arrastar.
  const [arrastandoFoto, setArrastandoFoto] = useState(false);

  // Só recalcula os erros quando o form muda — mas só exibimos pro usuário
  // depois da primeira tentativa de publicar (mesmo comportamento da Web).
  const errosCalculados = useMemo(() => validarFormulario(form), [form]);
  const erros = tentouPublicar ? errosCalculados : {};

  const totalCompletas = SECOES.filter((s) => secaoEstaCompleta(s.id, form)).length;

  const handleChangeCampo = <K extends keyof CadastroFerramentaFormState>(
    campo: K,
    valor: CadastroFerramentaFormState[K],
  ) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  };

  const handleToggleDiaIndisponivel = (dataIso: string) => {
    setForm((atual) => {
      const jaIndisponivel = atual.diasIndisponiveis.includes(dataIso);
      return {
        ...atual,
        diasIndisponiveis: jaIndisponivel
          ? atual.diasIndisponiveis.filter((d) => d !== dataIso)
          : [...atual.diasIndisponiveis, dataIso],
      };
    });
  };

  const handlePublicar = () => {
    const errosAtuais = validarFormulario(form);
    setTentouPublicar(true);

    const temErro = Object.keys(errosAtuais).length > 0;

    if (temErro) {
      // Abre a primeira seção (na ordem de exibição) que tiver erro.
      const primeiraComErro = SECOES.find((s) => secaoTemErro(s.id, errosAtuais));
      if (primeiraComErro) setSecaoAberta(primeiraComErro.id);

      Alert.alert(
        'Revise o formulário',
        'Alguns campos obrigatórios ainda precisam ser preenchidos. Os cards com pendência estão marcados em vermelho.',
      );
      return;
    }

    if (modoEdicao && ferramentaId) {
      editarFerramenta(ferramentaId, form);
      Alert.alert('Ferramenta atualizada!', 'As alterações foram salvas.', [
        {
          text: 'OK',
          onPress: () => {
            if (navigation.canGoBack()) navigation.goBack();
          },
        },
      ]);
      return;
    }

    // Sem backend ainda: guarda só em memória (contexto), pra testar o fluxo completo.
    adicionarFerramenta(form);

    Alert.alert('Ferramenta cadastrada!', 'Sua ferramenta foi salva (armazenamento local de testes).', [
      {
        text: 'OK',
        onPress: () => {
          setForm(criarFormularioVazio());
          setTentouPublicar(false);
          if (navigation.canGoBack()) navigation.goBack();
        },
      },
    ]);
  };

  const renderConteudoSecao = (id: SecaoId) => {
    switch (id) {

      case 'fotos':
        return (
          <FotosFerramenta
            fotos={form.fotos}
            onChange={(fotos) => handleChangeCampo('fotos', fotos)}
            error={erros.fotos}
            shake={tentouPublicar && Boolean(erros.fotos)}
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
            onChange={(valor) => handleChangeCampo('descricao', valor)}
            error={erros.descricao}
            shake={tentouPublicar && Boolean(erros.descricao)}
          />
        );
      case 'especificacoes':
        return (
          <EspecificacoesTecnicasForm
            especificacoes={form.especificacoes}
            onChange={(especificacoes) => handleChangeCampo('especificacoes', especificacoes)}
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
            onChangeValorDiaria={(valor) => handleChangeCampo('valorDiaria', valor)}
            onChangeCaucao={(valor) => handleChangeCampo('caucao', valor)}
            error={erros.valorDiaria}
            shake={tentouPublicar && Boolean(erros.valorDiaria)}
          />
        );
      case 'acessorios':
        return (
          <AcessoriosInclusos
            acessorios={form.acessorios}
            onChange={(acessorios) => handleChangeCampo('acessorios', acessorios)}
          />
        );
      case 'aprovacao':
        return (
          <AprovacaoLocacao
            tipoAprovacao={form.tipoAprovacao}
            onChange={(valor) => handleChangeCampo('tipoAprovacao', valor)}
            error={erros.tipoAprovacao}
            shake={tentouPublicar && Boolean(erros.tipoAprovacao)}
          />
        );
      case 'calendario':
        return (
          <CalendarioDisponibilidade
            diasIndisponiveis={form.diasIndisponiveis}
            onToggleDia={handleToggleDiaIndisponivel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.textDark} />
        </TouchableOpacity>

        <View style={styles.cabecalhoTextos}>
          <Text style={styles.titulo}>
            {modoEdicao ? 'Editar Ferramenta' : 'Cadastrar Ferramenta'}
          </Text>
          <Text style={styles.subtitulo}>Toque em cada card para preencher a seção</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {SECOES.map((secao) => (
            <SecaoCard
              key={secao.id}
              icone={secao.icone}
              titulo={secao.titulo}
              obrigatorio={secao.obrigatorio}
              completo={secaoEstaCompleta(secao.id, form)}
              comErro={tentouPublicar && secaoTemErro(secao.id, errosCalculados)}
              onPress={() => setSecaoAberta(secao.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.barraInferior}>
        <Text style={styles.progresso}>{totalCompletas} de {SECOES.length} seções completas</Text>
        <TouchableOpacity style={styles.botaoPublicar} onPress={handlePublicar} activeOpacity={0.85}>
          <Text style={styles.botaoPublicarTexto}>
            {modoEdicao ? 'Salvar Alterações' : 'Publicar Ferramenta'}
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
          scrollEnabled={secao.id === 'fotos' ? !arrastandoFoto : true}
        >
          {renderConteudoSecao(secao.id)}
        </SecaoModal>
      ))}
    </View>
  );
}