import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { Camera, X } from 'lucide-react-native';

import Avatar from '../../../Shared/Avatar/Avatar';
import FormInput from '../../../Shared/Inputs/FormInput/FormInput';
import BtnPrincipal from '../../../Botoes/BtnPrincipal';
import type { Usuario } from '../../../../types/Auth/usuario.types';
import { maskCPF, maskCNPJ, maskPhone, maskCEP } from '../../../../utils/Formatacao/masks';
import { useEditarPerfilForm } from '../../../../hooks/Conta/Perfil/useEditarPerfilForm';
import { useFotoPerfil } from '../../../../hooks/Conta/Perfil/useFotoPerfil';
import type { PerfilFormData } from '../../../../hooks/Conta/Perfil/perfilSchema';
import { styles } from './styles';

// ==========================================
// INTERFACES E TIPAGENS
// ==========================================
interface EditarPerfilModalProps {
    usuario: Usuario; // Dados atuais do usuário para preencher o formulário
    onClose: () => void; // Função para fechar o modal
    onSalvar: (dados: Partial<Usuario>) => void; // Função disparada quando o formulário é válido e salvo
    /**
     * Override opcional do seletor de imagem. Por padrão o modal já abre a
     * câmera/galeria sozinho (useFotoPerfil) — esta prop existe só para quem
     * precisar de outra origem (ex: upload direto para o backend).
     *
     * Deve resolver com a nova URI, `null` para remover a foto atual ou
     * `undefined` para não mudar nada.
     */
    onAlterarFoto?: () => Promise<string | null | undefined> | string | null | undefined;
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

/**
 * Modal de Editar Perfil.
 *
 * Espelha a lógica da Web: mesmos campos, mesma validação (useEditarPerfilForm + zod) 
 * e reusa os componentes de UI do app Mobile (FormInput, BtnPrincipal).
 */
export default function EditarPerfilModal({
    usuario,
    onClose,
    onSalvar,
    onAlterarFoto,
}: EditarPerfilModalProps) {
    
    // Estado local para armazenar a foto selecionada ANTES de salvar o formulário de fato
    const [fotoUrl, setFotoUrl] = useState<string | undefined>(usuario.fotoUrl);

    // Hook customizado que lida com a câmera/galeria (que comentamos anteriormente)
    const { escolherFoto, carregando: carregandoFoto } = useFotoPerfil();

    // Hook customizado que encapsula toda a complexidade do react-hook-form, 
    // validações (Zod), animações de erro (shakes) e alertas
    const {
        control,
        isCNPJ, // Variável derivada que descobre se o documento digitado é um CNPJ
        alerta,
        setAlerta,
        shakes,
        clearShake,
        touchedFields,
        errors,
        trigger,
        buildSubmit,
    } = useEditarPerfilForm(usuario);

    // ==========================================
    // FUNÇÕES DE AÇÃO
    // ==========================================

    /**
     * Disparada pelo react-hook-form apenas se todos os campos passarem pela validação do Zod.
     */
    const onValidSubmit = (data: PerfilFormData) => {
        // Concatena os campos separados do formulário em uma única string de endereço
        const enderecoCompleto = `${data.logradouro}, ${data.numero} - CEP: ${data.cep}`;

        // Envia os dados higienizados para o componente pai
        onSalvar({
            nome: data.nome,
            telefone: data.telefone,
            documento: data.documento,
            endereco: enderecoCompleto,
            fotoUrl,
        });

        // Fecha o modal após salvar
        onClose();
    };

    /**
     * Atalho útil para usuários que não lembram o próprio CEP.
     * Abre o site oficial dos Correios no navegador padrão do celular.
     */
    const abrirCep = () => {
        Linking.openURL(
            'https://buscacepinter.correios.com.br/app/endereco/index.php'
        );
    };

    /**
     * Gerencia o clique no botão de "Alterar Foto".
     */
    const alterarFoto = async () => {
        // Se o componente pai passou a prop `onAlterarFoto`, usa ela.
        // Se não, usa o comportamento padrão do hook `escolherFoto`.
        const resultado = onAlterarFoto
            ? await onAlterarFoto()
            : await escolherFoto(Boolean(fotoUrl));

        // Se retornou undefined, significa que o usuário cancelou a ação. Não faz nada.
        if (resultado === undefined) return;

        // Atualiza a imagem no estado local (null remove a foto, string coloca uma nova)
        setFotoUrl(resultado ?? undefined);
    };

    // ==========================================
    // RENDERIZAÇÃO
    // ==========================================
    return (
        <Modal
            visible
            animationType="slide"
            transparent // Permite ver o fundo esmaecido por trás do modal
            onRequestClose={onClose} // Fecha no botão físico de voltar do Android
        >
            {/* 
              KeyboardAvoidingView empurra o conteúdo para cima quando o teclado virtual abre.
              No iOS usamos 'padding', no Android o próprio sistema já lida bem sem a prop behavior.
            */}
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.modal}>
                    
                    {/* CABEÇALHO DO MODAL */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Editar Perfil
                        </Text>
                        <Pressable onPress={onClose} style={styles.close}>
                            <X size={20} />
                        </Pressable>
                    </View>

                    {/* CORPO DO MODAL (COM SCROLL) */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                        keyboardShouldPersistTaps="handled" // Permite clicar em botões sem precisar fechar o teclado antes
                    >
                        
                        {/* SESSÃO: FOTO DE PERFIL */}
                        <View style={styles.photo}>
                            <Avatar nome={usuario.nome} fotoUrl={fotoUrl} size={72} />

                            <Pressable
                                style={[
                                    styles.photoButton,
                                    carregandoFoto && styles.photoButtonDisabled,
                                ]}
                                onPress={alterarFoto}
                                disabled={carregandoFoto}
                                accessibilityRole="button"
                                accessibilityState={{ disabled: carregandoFoto }}
                            >
                                {carregandoFoto ? (
                                    <ActivityIndicator size="small" />
                                ) : (
                                    <Camera size={14} />
                                )}
                                <Text style={styles.photoText}>
                                    {fotoUrl ? 'Alterar foto' : 'Adicionar foto'}
                                </Text>
                            </Pressable>
                        </View>

                        {/* ALERTA DE ERRO GERAL (Ex: Erro ao se comunicar com a API) */}
                        {alerta && (
                            <Pressable
                                onPress={() => setAlerta(null)}
                                style={styles.alert}
                            >
                                <Text style={styles.alertTitle}>{alerta.titulo}</Text>
                                {alerta.mensagem && (
                                    <Text style={styles.alertMessage}>{alerta.mensagem}</Text>
                                )}
                            </Pressable>
                        )}

                        {/* SESSÃO: FORMULÁRIO */}
                        <View style={styles.form}>
                            
                            {/* CAMPO: NOME */}
                            <Controller
                                control={control} // Conecta este input ao react-hook-form
                                name="nome"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Nome completo"
                                        placeholder="Ex: João da Silva"
                                        value={value}
                                        required
                                        shake={shakes.nome.shake} // Prop responsável por fazer o input tremer caso haja erro
                                        onBlur={() => trigger('nome')} // Valida o campo assim que o usuário tira o foco
                                        onChangeText={(v) => { 
                                            onChange(v); 
                                            clearShake('nome'); // Limpa o estado de erro/tremor ao digitar
                                        }}
                                        status={errors.nome || shakes.nome.active ? 'erro' : touchedFields.nome ? 'sucesso' : ''}
                                        error={errors.nome?.message}
                                    />
                                )}
                            />

                            {/* CAMPO: TELEFONE */}
                            <Controller
                                control={control}
                                name="telefone"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Telefone"
                                        keyboardType="numeric" // Abre o teclado de números
                                        placeholder="(00) 00000-0000"
                                        value={value}
                                        required
                                        shake={shakes.telefone.shake}
                                        onBlur={() => trigger('telefone')}
                                        onChangeText={(v) => { 
                                            onChange(maskPhone(v)); // Aplica a formatação em tempo real
                                            clearShake('telefone'); 
                                        }}
                                        status={errors.telefone || shakes.telefone.active ? 'erro' : touchedFields.telefone ? 'sucesso' : ''}
                                        error={errors.telefone?.message}
                                    />
                                )}
                            />

                            {/* CAMPO: DOCUMENTO (CPF/CNPJ) */}
                            <Controller
                                control={control}
                                name="documento"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label={isCNPJ ? 'CNPJ' : 'CPF'} // Título dinâmico dependendo da quantidade de dígitos
                                        keyboardType="numeric"
                                        placeholder={isCNPJ ? '00.000.000/0000-00' : '000.000.000-00'}
                                        value={value}
                                        required
                                        shake={shakes.documento.shake}
                                        onBlur={() => trigger('documento')}
                                        onChangeText={(v) => {
                                            // Descobre qual máscara usar de acordo com o estado do hook
                                            onChange(isCNPJ ? maskCNPJ(v) : maskCPF(v));
                                            clearShake('documento');
                                        }}
                                        status={errors.documento || shakes.documento.active ? 'erro' : touchedFields.documento ? 'sucesso' : ''}
                                        error={errors.documento?.message}
                                    />
                                )}
                            />

                            <Text style={styles.section}>Endereço</Text>

                            {/* CAMPO: CEP */}
                            <Controller
                                control={control}
                                name="cep"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="CEP"
                                        keyboardType="numeric"
                                        placeholder="00000-000"
                                        value={value}
                                        required
                                        shake={shakes.cep.shake}
                                        onBlur={() => trigger('cep')}
                                        onChangeText={(v) => { 
                                            onChange(maskCEP(v)); // Aplica máscara de CEP
                                            clearShake('cep'); 
                                        }}
                                        status={errors.cep || shakes.cep.active ? 'erro' : touchedFields.cep ? 'sucesso' : ''}
                                        error={errors.cep?.message}
                                    />
                                )}
                            />

                            {/* Botão de auxílio para descobrir CEP */}
                            <Pressable onPress={abrirCep}>
                                <Text style={styles.cepLink}>Não sei meu CEP</Text>
                            </Pressable>

                            {/* CAMPO: LOGRADOURO (Rua) */}
                            <Controller
                                control={control}
                                name="logradouro"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Rua/Logradouro"
                                        placeholder="Ex: Avenida Paulista"
                                        value={value}
                                        required
                                        shake={shakes.logradouro.shake}
                                        onBlur={() => trigger('logradouro')}
                                        onChangeText={(v) => { onChange(v); clearShake('logradouro'); }}
                                        status={errors.logradouro || shakes.logradouro.active ? 'erro' : touchedFields.logradouro ? 'sucesso' : ''}
                                        error={errors.logradouro?.message}
                                    />
                                )}
                            />

                            {/* CAMPO: NÚMERO */}
                            <Controller
                                control={control}
                                name="numero"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Número"
                                        keyboardType="numeric"
                                        placeholder="Ex: 123"
                                        value={value}
                                        required
                                        shake={shakes.numero.shake}
                                        onBlur={() => trigger('numero')}
                                        onChangeText={(v) => { onChange(v); clearShake('numero'); }}
                                        status={errors.numero || shakes.numero.active ? 'erro' : touchedFields.numero ? 'sucesso' : ''}
                                        error={errors.numero?.message}
                                    />
                                )}
                            />
{/* BOTÃO DE SALVAR */}
<BtnPrincipal
    title="Salvar alterações"
    // `buildSubmit` encapsula o `handleSubmit` do hook-form
    // Ele tenta validar; se houver erro nos campos, ele dispara a animação de shake
    // Se estiver tudo certo, dispara a função `onValidSubmit`
    onPress={() => buildSubmit(onValidSubmit)()}
/>
</View>
</ScrollView>
</View>
</KeyboardAvoidingView>
</Modal>
);
}