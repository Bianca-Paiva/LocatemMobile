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
import colors from '../../../theme/colors';

// Definição do componente e desestruturação das props (usuario e função onEditar)
export default function PerfilHeader({
    usuario,
    onEditar,
}: {
    usuario: Usuario;
    onEditar: () => void;
}) {
    // Variável booleana para verificar se o usuário é do tipo 'locador'
    const locador = usuario.tipo === 'locador';

    return (
        <View style={styles.card}>
            <View style={styles.info}>
               
                {/* Componente reutilizável de Avatar exibindo a foto e o nome do usuário */}
                <Avatar
                    nome={usuario.nome}
                    fotoUrl={usuario.fotoUrl}
                    size={72}
                />

                <View style={styles.texts}>
                    {/* Nome do usuário com truncagem caso seja muito longo (numberOfLines={1}) */}
                    <Text
                        numberOfLines={1}
                        style={styles.name}
                    >
                        {usuario.nome}
                    </Text>

                    {/* Badge/Insígnia que muda dinamicamente de acordo com o tipo de usuário */}
                    <View style={styles.badge}>
                        {locador ? (
                        <Wrench size={13} color={colors.amber} />
                        ) : (
                            <UserRound size={13} color={colors.amber} />
                        )}

                        {/* Texto dinâmico exibindo o papel do usuário e há quanto tempo ele está na plataforma */}
                        <Text style={styles.badgeText}>
                            {locador ? 'Locador' : 'Locatário'}{' '}
                            desde {usuario.desde}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Botão interativo para disparar a ação de editar o perfil */}
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