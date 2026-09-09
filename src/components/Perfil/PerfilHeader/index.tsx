
import React from 'react';
import {
    Pencil,
    UserRound,
    Wrench,
} from 'lucide-react-native';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import Avatar from '../../Avatar/Avatar';
import type { Usuario } from '../../../types/usuario.types';

import { styles } from './styles';

export default function PerfilHeader({
    usuario,
    onEditar,
}: {
    usuario: Usuario;
    onEditar: () => void;
}) {
    const locador = usuario.tipo === 'locador';

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Avatar
                    nome={usuario.nome}
                    fotoUrl={usuario.fotoUrl}
                />

                <View style={styles.texts}>
                    <Text
                        numberOfLines={1}
                        style={styles.name}
                    >
                        {usuario.nome}
                    </Text>

                    <View style={styles.badge}>
                        {locador ? (
                            <Wrench size={13} />
                        ) : (
                            <UserRound size={13} />
                        )}

                        <Text style={styles.badgeText}>
                            {locador ? 'Locador' : 'Locatário'}{' '}
                            desde {usuario.desde}
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable
                style={styles.edit}
                onPress={onEditar}
            >
                <Pencil size={15} />

                <Text style={styles.editText}>
                    Editar Perfil
                </Text>
            </Pressable>
        </View>
    );
}

