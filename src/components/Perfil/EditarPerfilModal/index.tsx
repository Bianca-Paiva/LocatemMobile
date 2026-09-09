import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Camera, X } from 'lucide-react-native';

import type { Usuario } from '../../../types/usuario.types';
import { useEditarPerfilForm } from '../../../hooks/Perfil/useEditarPerfilForm';
import { styles } from './styles';

const digits = (v: string) => v.replace(/\D/g, '');

const maskPhone = (v: string) => {
    const d = digits(v).slice(0, 11);

    return d.length <= 10
        ? d
              .replace(/(\d{2})(\d{0,4})(\d{0,4})/, '($1) $2-$3')
              .replace(/-$/, '')
        : d
              .replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
              .replace(/-$/, '');
};

const maskCPF = (v: string) =>
    digits(v)
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskCNPJ = (v: string) =>
    digits(v)
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');

const maskCEP = (v: string) =>
    digits(v)
        .slice(0, 8)
        .replace(/(\d{5})(\d)/, '$1-$2');

interface FieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    error?: string;
    keyboardType?: 'default' | 'numeric';
}

function Field({
    label,
    value,
    onChange,
    placeholder,
    error,
    keyboardType = 'default',
}: FieldProps) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>
                {label}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor="#A0A0A0"
                keyboardType={keyboardType}
                style={[
                    styles.input,
                    error && styles.inputError,
                ]}
            />

            {error && (
                <Text style={styles.error}>
                    {error}
                </Text>
            )}
        </View>
    );
}

interface EditarPerfilModalProps {
    usuario: Usuario;
    onClose: () => void;
    onSalvar: (dados: Partial<Usuario>) => void;
    onAlterarFoto?: () => void;
}

export default function EditarPerfilModal({
    usuario,
    onClose,
    onSalvar,
    onAlterarFoto,
}: EditarPerfilModalProps) {
    const {
        control,
        isCNPJ,
        alerta,
        setAlerta,
        submit,
        reset,
    } = useEditarPerfilForm(usuario);

    const [fotoUrl, setFotoUrl] = useState(usuario.fotoUrl);

    useEffect(() => {
        setFotoUrl(usuario.fotoUrl);

        reset({
            nome: usuario.nome,
            telefone: usuario.telefone,
            documento: usuario.documento,
            cep: '',
            logradouro: usuario.endereco || '',
            numero: '',
        });
    }, [usuario, reset]);

    const salvar = (data: any) => {
        onSalvar({
            nome: data.nome,
            telefone: data.telefone,
            documento: data.documento,
            endereco: `${data.logradouro}, ${data.numero} - CEP: ${data.cep}`,
            fotoUrl,
        });

        onClose();
    };

    const fecharAlerta = () => {
        setAlerta(null);
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
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Editar Perfil
                        </Text>

                        <Pressable
                            onPress={onClose}
                            style={styles.close}
                        >
                            <X size={20} />
                        </Pressable>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.photo}>
                            <View style={styles.avatar}>
                                {fotoUrl ? (
                                    <Image
                                        source={{ uri: fotoUrl }}
                                        style={styles.avatarImage}
                                    />
                                ) : (
                                    <Text style={styles.initials}>
                                        {usuario.nome
                                            .split(/\s+/)
                                            .slice(0, 2)
                                            .map((x) => x[0])
                                            .join('')
                                            .toUpperCase()}
                                    </Text>
                                )}
                            </View>

                            <Pressable
                                style={styles.photoButton}
                                onPress={() =>
                                    onAlterarFoto
                                        ? onAlterarFoto()
                                        : Alert.alert(
                                              'Alterar foto',
                                              'Integre aqui o seletor de imagens do seu aplicativo.'
                                          )
                                }
                            >
                                <Camera size={14} />

                                <Text style={styles.photoText}>
                                    Alterar foto
                                </Text>
                            </Pressable>
                        </View>

                        {alerta && (
                            <Pressable
                                onPress={fecharAlerta}
                                style={styles.alert}
                            >
                                <Text style={styles.alertTitle}>
                                    {alerta.titulo}
                                </Text>

                                {alerta.mensagem && (
                                    <Text style={styles.alertMessage}>
                                        {alerta.mensagem}
                                    </Text>
                                )}
                            </Pressable>
                        )}

                        <View style={styles.form}>
                            <Controller
                                control={control}
                                name="nome"
                                render={({ field }) => (
                                    <Field
                                        label="Nome completo"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Ex: João da Silva"
                                        error={
                                            control._formState.errors.nome
                                                ?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="telefone"
                                render={({ field }) => (
                                    <Field
                                        label="Telefone"
                                        value={field.value}
                                        onChange={(v) =>
                                            field.onChange(
                                                maskPhone(v)
                                            )
                                        }
                                        placeholder="(00) 00000-0000"
                                        keyboardType="numeric"
                                        error={
                                            control._formState.errors
                                                .telefone?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="documento"
                                render={({ field }) => (
                                    <Field
                                        label={
                                            isCNPJ
                                                ? 'CNPJ'
                                                : 'CPF'
                                        }
                                        value={field.value}
                                        onChange={(v) =>
                                            field.onChange(
                                                isCNPJ
                                                    ? maskCNPJ(v)
                                                    : maskCPF(v)
                                            )
                                        }
                                        placeholder={
                                            isCNPJ
                                                ? '00.000.000/0000-00'
                                                : '000.000.000-00'
                                        }
                                        keyboardType="numeric"
                                        error={
                                            control._formState.errors
                                                .documento?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Text style={styles.section}>
                                Endereço
                            </Text>

                            <Controller
                                control={control}
                                name="cep"
                                render={({ field }) => (
                                    <Field
                                        label="CEP"
                                        value={field.value}
                                        onChange={(v) =>
                                            field.onChange(
                                                maskCEP(v)
                                            )
                                        }
                                        placeholder="00000-000"
                                        keyboardType="numeric"
                                        error={
                                            control._formState.errors
                                                .cep?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Pressable
                                onPress={() =>
                                    Alert.alert(
                                        'Consulta de CEP',
                                        'Abra a página dos Correios no navegador para consultar seu CEP.'
                                    )
                                }
                            >
                                <Text style={styles.cepLink}>
                                    Não sei meu CEP
                                </Text>
                            </Pressable>

                            <Controller
                                control={control}
                                name="logradouro"
                                render={({ field }) => (
                                    <Field
                                        label="Rua/Logradouro"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Ex: Avenida Paulista"
                                        error={
                                            control._formState.errors
                                                .logradouro?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="numero"
                                render={({ field }) => (
                                    <Field
                                        label="Número"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Ex: 123"
                                        keyboardType="numeric"
                                        error={
                                            control._formState.errors
                                                .numero?.message as
                                                | string
                                                | undefined
                                        }
                                    />
                                )}
                            />

                            <Pressable
                                style={styles.save}
                                onPress={() => submit(salvar)}
                            >
                                <Text style={styles.saveText}>
                                    Salvar alterações
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}



