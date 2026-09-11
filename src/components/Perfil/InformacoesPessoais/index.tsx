
import React from 'react';
import {
    CreditCard,
    Home,
    Mail,
    Pencil,
    Phone,
    UserRound,
} from 'lucide-react-native';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { Usuario } from '../../../types/usuario.types';

import { styles } from './styles';

export default function InformacoesPessoais({
    usuario,
    onEditar,
}: {
    usuario: Usuario;
    onEditar: () => void;
}) {
    const documento =
        usuario.tipo === 'locador' ? 'CNPJ' : 'CPF';

    const rows = [
        [UserRound, 'Nome completo', usuario.nome || '—'],
        [
            CreditCard,
            documento,
            usuario.documento || 'Não informado',
        ],
        [Mail, 'E-mail', usuario.email || '—'],
        [
            Phone,
            'Telefone',
            usuario.telefone || 'Não informado',
        ],
        [
            Home,
            'Endereço principal',
            usuario.endereco || 'Não informado',
        ],
    ] as const;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Informações Pessoais
                </Text>

                <Pressable
                    style={styles.iconButton}
                    onPress={onEditar}
                >
                    <Pencil size={16} />
                </Pressable>
            </View>

            {rows.map(([Icon, label, value], i) => (
                <View
                    key={label}
                    style={[
                        styles.row,
                        i === rows.length - 1 && styles.last,
                    ]}
                >
                    <View style={styles.label}>
                        <Icon size={16} opacity={0.7} />

                        <Text style={styles.labelText}>
                            {label}
                        </Text>
                    </View>

                    <Text style={styles.value}>
                        {value}
                    </Text>
                </View>
            ))}
        </View>
    );
}



