import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
    Alert,
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

import Avatar from '../../Avatar/Avatar';
import FormInput from '../../Inputs/FormInput/FormInput';
import BtnPrincipal from '../../BtnPrincipal';
import type { Usuario } from '../../../types/usuario.types';
import { maskCPF, maskCNPJ, maskPhone, maskCEP } from '../../../hooks/masks';
import { useEditarPerfilForm } from '../../../hooks/Perfil/useEditarPerfilForm';
import type { PerfilFormData } from '../../../hooks/Perfil/perfilSchema';
import { styles } from './styles';

interface EditarPerfilModalProps {
    usuario: Usuario;
    onClose: () => void;
    onSalvar: (dados: Partial<Usuario>) => void;
    /**
     * React Native não tem `<input type="file">` como a Web — quem integra
     * este componente decide como abrir a galeria/câmera (ex: com
     * expo-image-picker) e repassa a nova `fotoUrl` aqui. Sem essa prop,
     * caímos num Alert de placeholder (ver onPress do botão "Alterar foto").
     */
    onAlterarFoto?: () => void;
}

/**
 * Modal de Editar Perfil.
 *
 * Espelha components/Perfil/EditarPerfilModal/EditarPerfilModal.tsx da Web:
 * mesmos campos, mesma validação (useEditarPerfilForm + zod) e agora reusa
 * os componentes de UI que o próprio app Mobile já tinha (FormInput,
 * BtnPrincipal) em vez de reimplementar TextInput/Pressable soltos.
 */
export default function EditarPerfilModal({
    usuario,
    onClose,
    onSalvar,
    onAlterarFoto,
}: EditarPerfilModalProps) {
    const [fotoUrl, setFotoUrl] = useState(usuario.fotoUrl);

    const {
        control,
        isCNPJ,
        alerta,
        setAlerta,
        shakes,
        clearShake,
        touchedFields,
        errors,
        trigger,
        buildSubmit,
    } = useEditarPerfilForm(usuario);

    const onValidSubmit = (data: PerfilFormData) => {
        const enderecoCompleto = `${data.logradouro}, ${data.numero} - CEP: ${data.cep}`;

        onSalvar({
            nome: data.nome,
            telefone: data.telefone,
            documento: data.documento,
            endereco: enderecoCompleto,
            fotoUrl,
        });

        onClose();
    };

    const abrirCep = () => {
        Linking.openURL(
            'https://buscacepinter.correios.com.br/app/endereco/index.php'
        );
    };

    const alterarFoto = () => {
        if (onAlterarFoto) {
            onAlterarFoto();
            return;
        }

        Alert.alert(
            'Alterar foto',
            'Integre aqui o seletor de imagens do seu aplicativo (ex: expo-image-picker).'
        );
    };

    return (
        <Modal
            visible
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Editar Perfil
                        </Text>

                        <Pressable onPress={onClose} style={styles.close}>
                            <X size={20} />
                        </Pressable>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.photo}>
                            <Avatar nome={usuario.nome} fotoUrl={fotoUrl} size={72} />

                            <Pressable style={styles.photoButton} onPress={alterarFoto}>
                                <Camera size={14} />
                                <Text style={styles.photoText}>Alterar foto</Text>
                            </Pressable>
                        </View>

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

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="nome"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Nome completo"
                                        placeholder="Ex: João da Silva"
                                        value={value}
                                        required
                                        shake={shakes.nome.shake}
                                        onBlur={() => trigger('nome')}
                                        onChangeText={(v) => { onChange(v); clearShake('nome'); }}
                                        status={errors.nome || shakes.nome.active ? 'erro' : touchedFields.nome ? 'sucesso' : ''}
                                        error={errors.nome?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="telefone"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label="Telefone"
                                        keyboardType="numeric"
                                        placeholder="(00) 00000-0000"
                                        value={value}
                                        required
                                        shake={shakes.telefone.shake}
                                        onBlur={() => trigger('telefone')}
                                        onChangeText={(v) => { onChange(maskPhone(v)); clearShake('telefone'); }}
                                        status={errors.telefone || shakes.telefone.active ? 'erro' : touchedFields.telefone ? 'sucesso' : ''}
                                        error={errors.telefone?.message}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="documento"
                                render={({ field: { onChange, value } }) => (
                                    <FormInput
                                        label={isCNPJ ? 'CNPJ' : 'CPF'}
                                        keyboardType="numeric"
                                        placeholder={isCNPJ ? '00.000.000/0000-00' : '000.000.000-00'}
                                        value={value}
                                        required
                                        shake={shakes.documento.shake}
                                        onBlur={() => trigger('documento')}
                                        onChangeText={(v) => {
                                            onChange(isCNPJ ? maskCNPJ(v) : maskCPF(v));
                                            clearShake('documento');
                                        }}
                                        status={errors.documento || shakes.documento.active ? 'erro' : touchedFields.documento ? 'sucesso' : ''}
                                        error={errors.documento?.message}
                                    />
                                )}
                            />

                            <Text style={styles.section}>Endereço</Text>

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
                                        onChangeText={(v) => { onChange(maskCEP(v)); clearShake('cep'); }}
                                        status={errors.cep || shakes.cep.active ? 'erro' : touchedFields.cep ? 'sucesso' : ''}
                                        error={errors.cep?.message}
                                    />
                                )}
                            />

                            {/* <Pressable onPress={abrirCep}>
                                <Text style={styles.cepLink}>Não sei meu CEP</Text>
                            </Pressable> */}

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

                            <BtnPrincipal
                                title="Salvar alterações"
                                onPress={() => buildSubmit(onValidSubmit)()}
                            />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
