import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {UserTypeCardProps} from './types';
import styles from "./styles";

export default function UserTypeCard({ title, description, icon, selected, onPress }: UserTypeCardProps) {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                selected && styles.cardSelected
            ]}
            onPress={onPress}
        >

            <View
                style={[
                    styles.iconContainer,
                    selected && styles.iconContainerSelected
                ]}
            >
                <Image source={icon} style={styles.icon} />
            </View>

            <Text style={styles.title}>{title}</Text>

            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
}
