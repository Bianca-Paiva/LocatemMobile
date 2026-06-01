import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserTypeCard({ title, description, icon, selected, onPress }) {
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

const styles = StyleSheet.create({

    card: {
        width: "48%",
        height: 135,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
    },

    cardSelected: {
        borderColor: "#FFD600",
        borderWidth: 1.5,
        backgroundColor: "#FFFDF3",
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#EEEEEE",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    iconContainerSelected: {
        backgroundColor: "#FFD600",
    },

    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },

    description: {
        textAlign: "center",
        fontSize: 12,
        color: "#666",
    },
});