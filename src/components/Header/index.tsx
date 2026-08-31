import { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Image,
    Modal,
    Animated,
    Easing,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ===========================
// Navegação
// ===========================
import { Route, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/AppRoutes";

// ===========================
// Estilos e Tipos
// ===========================
import styles, { DRAWER_WIDTH } from "./styles";
import type { NavItem, ScreenName } from "./types";
import { useCarrinhoStore } from "../../hooks/useCarrinhoStore";

// ===========================
// Assets
// ===========================
// Ajuste o caminho abaixo caso a logo esteja em outra pasta do projeto
const logoIcon = require("../../../assets/images/LogoLocatem.png");

interface HeaderProps {
    // Quantidade de itens no carrinho (badge). Se 0 ou undefined, o badge some.
    cartCount?: number;
}

export default function Header({ cartCount }: HeaderProps) {
    // ===========================
    // Hooks de Navegação
    // ===========================
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();

    // Se `cartCount` não for informado por prop, usa a quantidade real de
    // itens do CarrinhoContext (mesma fonte usada pela tela de Carrinho).
    const { itens: itensCarrinho } = useCarrinhoStore();
    const quantidadeCarrinho = cartCount ?? itensCarrinho.length;

    // ===========================
    // Estados
    // ===========================
    const [search, setSearch] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);

    // ===========================
    // Animações (equivalente às transitions do CSS)
    // ===========================
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const overlayAnim = useRef(new Animated.Value(0)).current;

    const openMenu = () => setDrawerVisible(true);

    const closeMenu = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 280,
                easing: Easing.bezier(0.4, 0, 0.2, 1),
                useNativeDriver: true,
            }),
            Animated.timing(overlayAnim, {
                toValue: 0,
                duration: 220,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start(() => setDrawerVisible(false));
    };

    useEffect(() => {
        if (drawerVisible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 280,
                    easing: Easing.bezier(0.4, 0, 0.2, 1),
                    useNativeDriver: true,
                }),
                Animated.timing(overlayAnim, {
                    toValue: 1,
                    duration: 280,
                    easing: Easing.ease,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [drawerVisible]);

    // ===========================
    // Funções
    // ===========================
    function pesquisar() {
        if (!search.trim()) return;
        navigation.navigate("SearchScreen" , {
            search: search.trim(),
        } );
    }

    function handleNavigate(targetRoute?: ScreenName) {
        if (targetRoute) {
            navigation.navigate(targetRoute as never);
        }
        closeMenu();
    }

    // ===========================
    // Itens do menu lateral
    // (routes batendo com o RootStackParamList real, em ../../routes/AppRoutes)
    // ===========================
    const navItems: NavItem[] = [
        {
            label: "Início",
            route: "HomeScreen" as ScreenName,
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "home" : "home-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Carrinho",
            route: "CarrinhoScreen" as ScreenName,
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "cart" : "cart-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Cadastrar Ferramenta",
            route: "CadastroFerramentaScreen" as ScreenName,
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "plus-box" : "plus-box-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Minhas Reservas",
            route: "MinhasReservas" as ScreenName,
           
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "calendar-blank" : "calendar-blank-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Minhas Ferramentas",
            route: "MinhasFerramentasScreen" as ScreenName,
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "toolbox" : "toolbox-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Histórico",
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "clock" : "clock-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Avaliações",
            route: "Avaliacao" as ScreenName,

            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "star" : "star-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Notificações",
            // sem screen própria ainda — adicione "route" aqui quando a tela existir
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "bell" : "bell-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Entrar",
            route: "LoginScreen" as ScreenName,
            renderIcon: (active) => (
                <MaterialCommunityIcons
                    name={active ? "account-circle" : "account-circle-outline"}
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
        {
            label: "Suporte",
            renderIcon: () => (
                <MaterialCommunityIcons
                    name="headset"
                    size={22}
                    color="#0A0A0A"
                    style={styles.navItemIcon}
                />
            ),
        },
    ];

    // ===========================
    // Renderização
    // ===========================
    return (
        <View>
            {/* ── HEADER (topo com gradiente) ── */}
            <LinearGradient
                colors={["#FFD600", "#F2CB00", "#FFF8DC", "transparent"]}
                locations={[0, 0.35, 0.7, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.headerContainer}
            >
                <View style={styles.linhaTopo}>
                    <View style={styles.ladoEsquerdo}>
                        <TouchableOpacity
                            style={styles.menuBtn}
                            onPress={openMenu}
                            accessibilityLabel="Abrir menu"
                        >
                            <MaterialCommunityIcons name="menu" size={26} color="#0A0A0A" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.logo}
                            onPress={() => handleNavigate("HomeScreen" as ScreenName)}
                        >
                            <Image source={logoIcon} style={styles.logoImg} />
                            <Text style={styles.logoTexto}>LOCATEM</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.carrinhoBtn}
                        onPress={() => handleNavigate("CarrinhoScreen" as ScreenName)}
                        accessibilityLabel="Abrir carrinho"
                    >
                        <MaterialCommunityIcons
                            name="cart-outline"
                            size={24}
                            color="#0A0A0A"
                        />
                        {quantidadeCarrinho > 0 && (
                            <View style={styles.quantidadeCarrinho}>
                                <Text style={styles.quantidadeCarrinhoTexto}>
                                    {quantidadeCarrinho}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.barraPesquisa}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={20}
                        color="#0A0A0A"
                        style={{ opacity: 0.55 }}
                    />
                    <TextInput
                        style={styles.barraPesquisaInput}
                        placeholder="Qual ferramenta você precisa hoje?"
                        placeholderTextColor="#8A8A8A"
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={pesquisar}
                        returnKeyType="search"
                    />
                </View>
            </LinearGradient>

            {/* ── MENU LATERAL (drawer) ── */}
            <Modal
                visible={drawerVisible}
                transparent
                animationType="none"
                onRequestClose={closeMenu}
                statusBarTranslucent
            >
                {/* Overlay */}
                <Animated.View style={[styles.overlay, { opacity: overlayAnim }]}>
                    <Pressable style={{ flex: 1 }} onPress={closeMenu} />
                </Animated.View>

                {/* Drawer */}
                <Animated.View
                    style={[
                        styles.drawer,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                >
                    <View style={styles.drawerCabecalho}>
                        <TouchableOpacity
                            style={styles.drawerLogo}
                            onPress={() => handleNavigate("HomeScreen" as ScreenName)}
                        >
                            <Image source={logoIcon} style={styles.drawerLogoImg} />
                            <Text style={styles.drawerLogoTexto}>LOCATEM</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.drawerBtnFechar}
                            onPress={closeMenu}
                            accessibilityLabel="Fechar menu"
                        >
                            <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.drawerConteudo}
                        showsVerticalScrollIndicator={false}
                    >
                        {navItems.map((item) => {
                            const active = item.route === route.name;

                            return (
                                <TouchableOpacity
                                    key={item.label}
                                    style={[
                                        styles.navItem,
                                        active && styles.navItemAtivo,
                                    ]}
                                    onPress={() => handleNavigate(item.route)}
                                >
                                    {item.renderIcon(active)}
                                    <Text
                                        style={[
                                            styles.navItemTexto,
                                            active && styles.navItemTextoAtivo,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </Animated.View>
            </Modal>
        </View>
    );
}
