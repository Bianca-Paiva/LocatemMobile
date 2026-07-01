import { ScrollView, Text, View } from "react-native";
import { Controller } from "react-hook-form"; // O Adaptador

// Importação das utilidades e máscaras
import { formatDocument } from "../../utils/masksCadastro";


// Componentes personalizados
import UserTypeCard from "../../components/UserTypeCard";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import BtnPrincipal from "../../components/BtnPrincipal";
import { AuthRedirect } from "../../components/AuthRedirect";

// Estilos Isolados
import { styles } from "./styles";

// O nosso Custom Hook (O Cérebro)
import { useCadastro } from "./useCadastro";

export default function CadastroScreen() {
  // Extraímos apenas as ferramentas que a View precisa para funcionar
  const {
    control,
    errors,
    isLoading,
    currentUserType,
    setValue,
    handleSignUp,
  } = useCadastro();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View style={styles.containerTitulo}>
        <Text style={styles.titulo}>Crie sua conta</Text>
        <Text style={styles.subTitulo}>
          Escolha como você deseja usar o aplicativo
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <UserTypeCard
          title="Locador"
          description="Anunciar ferramentas"
          // Substituímos o estado local pelo estado vigiado pelo Hook Form
          selected={currentUserType === "locador"}
          icon={require("../../../assets/images/IconFerramentaLocador.png")}
          onPress={() => {
            // Atualiza o tipo no Hook Form e limpa o documento simultaneamente
            setValue("userType", "locador");
            setValue("document", ""); 
          }}
        />

        <UserTypeCard
          title="Locatário"
          description="Alugar ferramentas"
          selected={currentUserType === "locatario"}
          icon={require("../../../assets/images/IconUserLocatario.png")}
          onPress={() => {
            setValue("userType", "locatario");
            setValue("document", "");
          }}
        />
      </View>

      <View style={styles.formContainer}>
        {/* ======================= NOME ======================= */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                text="Nome"
                placeholder="Digite seu nome completo"
                keyboardType="default"
                value={value}
                onChangeText={onChange}
              />
              {errors.name && <Text style={styles.erroTexto}>{errors.name.message}</Text>}
            </>
          )}
        />

        {/* ======================= E-MAIL ======================= */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                text="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && <Text style={styles.erroTexto}>{errors.email.message}</Text>}
            </>
          )}
        />

        {/* ======================= SENHA ======================= */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <PasswordInput
                text="Senha"
                placeholder="Crie uma senha segura"
                keyboardType="default"
                value={value}
                onChangeText={onChange}
              />
              {errors.password && <Text style={styles.erroTexto}>{errors.password.message}</Text>}
            </>
          )}
        />

        {/* ======================= CONFIRMAR SENHA ======================= */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <>
              <PasswordInput
                text="Confirmar senha"
                placeholder="Digite a senha novamente"
                keyboardType="default"
                value={value}
                onChangeText={onChange}
              />
              {errors.confirmPassword && <Text style={styles.erroTexto}>{errors.confirmPassword.message}</Text>}
            </>
          )}
        />

        {/* ======================= DOCUMENTO (CPF/CNPJ) ======================= */}
        <Controller
          control={control}
          name="document"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                text={currentUserType === "locatario" ? "CPF" : "CNPJ"}
                placeholder={
                  currentUserType === "locatario" ? "000.000.000-00" : "00.000.000/0000-00"
                }
                keyboardType="numeric"
                value={value}
                onChangeText={(text) => {
                  // Aplicamos a máscara ANTES de enviar o valor para o Hook Form
                  const formattedText = formatDocument(text, currentUserType);
                  onChange(formattedText);
                }}
              />
              {errors.document && <Text style={styles.erroTexto}>{errors.document.message}</Text>}
            </>
          )}
        />

        {/* ======================= ENDEREÇO ======================= */}
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                text="Endereço"
                placeholder="Digite seu endereço completo"
                keyboardType="default"
                value={value}
                onChangeText={onChange}
              />
              {errors.address && <Text style={styles.erroTexto}>{errors.address.message}</Text>}
            </>
          )}
        />

        <BtnPrincipal 
          title={isLoading ? "Carregando..." : "Criar conta"} 
          onPress={handleSignUp} 
        />
      </View>

      <AuthRedirect
        text="Já tem uma conta? "
        buttonText="Entrar"
        route="LoginScreen"
      />
    </ScrollView>
  );
}