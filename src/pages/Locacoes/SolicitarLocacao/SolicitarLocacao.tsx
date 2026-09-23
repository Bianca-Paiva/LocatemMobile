import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { Produto } from '../../../types/Ferramentas/produto.types';
import Header from '../../../components/Layout/Header';
import CabecalhoPagina from '../../../components/Layout/CabecalhoPagina/CabecalhoPagina';
import ProdutoResumoCard from '../../../components/Locacoes/SolicitarLocacao/ProdutoResumoCard/ProdutoResumoCard';
import CampoData from '../../../components/Locacoes/SolicitarLocacao/CampoData/CampoData';
import HorarioDropdown from '../../../components/Locacoes/SolicitarLocacao/HorarioDropdown/HorarioDropdown';

import SeletorQuantidade from '../../../components/Shared/Inputs/SeletorQuantidade/SeletorQuantidade';

import EnderecoEntrega from '../../../components/Locacoes/SolicitarLocacao/EnderecoEntrega/EnderecoEntrega';
import ResumoLocacao from '../../../components/Locacoes/SolicitarLocacao/ResumoLocacao/ResumoLocacao';

import { useProdutoStore } from '../../../hooks/Ferramentas/useProdutoStore';
import { useLocacaoStore } from '../../../hooks/Locacoes/useLocacaoStore';
import { useSolicitarLocacao } from '../../../hooks/Locacoes/useSolicitarLocacao';

import {
  validateCEP,
  validateFullName,
  validatePhone,
} from '../../../utils/Formatacao/masks';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

const PRODUTO_VAZIO: Produto = {
  id: 0,

  title: '',
  marca: '',
  price: '0',

  images: [],

  imageVerificado:
    require('../../../../assets/images/verificadoAzul.png'),

  imageNota:
    require('../../../../assets/images/StarFullYellow.png'),

  rating: 0,
  reviewCount: 0,

  locador: '',
  localizacao: '',
  categoria: '',

  estoqueDisponivel: 1,

  paymentMethods: [],

  available: false,
};

interface SolicitarLocacaoProps {
  navigate: (route: string) => void;
}

export default function SolicitarLocacao({
  navigate,
}: SolicitarLocacaoProps) {
  const { produtoSelecionado } =
    useProdutoStore();

  const {
    adicionarLocacao,
    setLocacaoSelecionada,
  } = useLocacaoStore();

  useEffect(() => {
    if (!produtoSelecionado) {
      navigate('HomeScreen');
    }
  }, [produtoSelecionado, navigate]);

  const produto =
    produtoSelecionado ??
    PRODUTO_VAZIO;

  const {
    form,
    setCampo,
    decrementarQuantidade,
    incrementarQuantidade,
    resumo,
    montarDadosLocacao,
  } = useSolicitarLocacao({
    produto,
  });

  const [tentouEnviar,
    setTentouEnviar] =
    useState(false);

  const [shake,
    setShake] =
    useState(false);

  if (!produtoSelecionado) {
    return null;
  }

  const erros = {
    dataEntrega:
      !form.dataEntrega
        ? 'Selecione a data de entrega'
        : undefined,

    horarioEntrega:
      !form.horarioEntrega
        ? 'Selecione o horário de entrega'
        : undefined,

    dataDevolucao:
      !form.dataDevolucao
        ? 'Selecione a data de devolução'
        : undefined,

    horarioDevolucao:
      !form.horarioDevolucao
        ? 'Selecione o horário de devolução'
        : undefined,

    cep:
      !form.cepDesconhecido &&
      !validateCEP(form.cep)
        ? 'Informe um CEP válido'
        : undefined,

    ruaAvenida:
      !form.ruaAvenida
        ? 'Informe a rua/avenida'
        : undefined,

    numero:
      !form.numero
        ? 'Informe o número'
        : undefined,

    nomeCompleto:
      !validateFullName(
        form.nomeCompleto
      )
        ? 'Informe seu nome completo'
        : undefined,

    telefoneContato:
      !validatePhone(
        form.telefoneContato
      )
        ? 'Informe um telefone válido'
        : undefined,
  };

  const handleCancelar =
    () => {
      navigate(
        'produtoDetalhe'
      );
    };

  const handleEnviarSolicitacao =
    () => {
      if (
        !resumo.formularioCompleto
      ) {
        setTentouEnviar(true);

        setShake(true);

        setTimeout(() => {
          setShake(false);
        }, 400);

        return;
      }

      const novaLocacao =
        adicionarLocacao(
          montarDadosLocacao()
        );

      setLocacaoSelecionada(
        novaLocacao
      );

      navigate(
        'solicitacaoEnviada'
      );
    };

  return (
    <>
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <CabecalhoPagina
          titulo="Solicitar Locacao"
          subtitulo="Preencha as informações abaixo para solicitar a locacao desta ferramenta."
        />

        <ProdutoResumoCard
          produto={produto}
        />

        <View
          style={
            styles.gridCampos
          }
        >
          <CampoData
            label="Data de entrega"
            value={
              form.dataEntrega
            }
            onChange={(valor) =>
              setCampo(
                'dataEntrega',
                valor
              )
            }
          />

          <HorarioDropdown
            label="Horário da entrega"
            value={
              form.horarioEntrega
            }
            onChange={(valor) =>
              setCampo(
                'horarioEntrega',
                valor
              )
            }
          />

          <CampoData
            label="Data devolução"
            value={
              form.dataDevolucao
            }
            onChange={(valor) =>
              setCampo(
                'dataDevolucao',
                valor
              )
            }
          />

          <HorarioDropdown
            label="Horário devolução"
            value={
              form.horarioDevolucao
            }
            onChange={(valor) =>
              setCampo(
                'horarioDevolucao',
                valor
              )
            }
          />

          <SeletorQuantidade
            quantidade={
              form.quantidade
            }
            estoqueDisponivel={
              produto
                .estoqueDisponivel
            }
            onDecrementar={
              decrementarQuantidade
            }
            onIncrementar={
              incrementarQuantidade
            }
          />

          {!resumo.periodoValido &&
            form.dataEntrega &&
            form.dataDevolucao && (
              <Text
                style={
                  styles.erroPeriodo
                }
              >
                A data de
                devolução deve ser
                posterior à data de
                entrega.
              </Text>
            )}
        </View>

        <EnderecoEntrega
          form={form}
          onChangeCampo={
            setCampo
          }
          erros={{
            cep:
              tentouEnviar
                ? erros.cep
                : undefined,

            ruaAvenida:
              tentouEnviar
                ? erros.ruaAvenida
                : undefined,

            numero:
              tentouEnviar
                ? erros.numero
                : undefined,

            nomeCompleto:
              tentouEnviar
                ? erros.nomeCompleto
                : undefined,

            telefoneContato:
              tentouEnviar
                ? erros.telefoneContato
                : undefined,
          }}
          shake={shake}
        />

        <ResumoLocacao
          resumo={resumo}
        />

        <View
          style={styles.acoes}
        >
          <Pressable
            style={
              styles.botaoSecundario
            }
            onPress={
              handleCancelar
            }
          >
            <Text
              style={
                styles.botaoTexto
              }
            >
              Cancelar
            </Text>
          </Pressable>

          <Pressable
            style={
              styles.botaoPrimario
            }
            onPress={
              handleEnviarSolicitacao
            }
          >
            <Text
              style={
                styles.botaoTexto
              }
            >
              Enviar
              solicitação
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}