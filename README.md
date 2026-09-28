# LOCATEM Mobile

Aplicativo mobile da LOCATEM para aluguel de ferramentas entre locadores e locatarios. O app cobre autenticacao, catalogo, busca, favoritos, carrinho, solicitacao de locacao, pagamento simulado, avaliacoes, notificacoes, perfil e gestao de ferramentas do locador.

## Tecnologias

- React Native com Expo
- TypeScript
- React Navigation
- React Hook Form e Zod
- Zustand e Context API
- AsyncStorage
- Jest com `jest-expo`

## Estrutura Principal

- `App.tsx`: monta fontes, providers globais e o container de navegacao.
- `index.tsx`: registra o app no runtime do Expo.
- `src/routes`: centraliza o stack principal e adapta rotas legadas usadas por telas antigas.
- `src/pages`: telas por fluxo de negocio, como Auth, Home, Ferramentas, Locacoes, Checkout, Conta e Avaliacao.
- `src/components`: componentes reutilizaveis organizados por dominio.
- `src/context`: estados globais compartilhados entre telas, como autenticacao, catalogo, carrinho, pagamento, favoritos e locacoes.
- `src/hooks`: hooks que encapsulam regras de tela, stores e acesso aos contextos.
- `src/services`: persistencia local e chamadas HTTP para a API.
- `src/utils`: formatacao, validacao, filtros e transformacoes puras.
- `src/types`: contratos TypeScript compartilhados.
- `src/mocks`: dados locais usados enquanto partes da API ainda sao simuladas.
- `tests`: testes unitarios de hooks, contexts, services, components e utils.

## Instalacao

```bash
npm install
```

## Executar

```bash
npm start
```

Outros comandos uteis:

```bash
npm run android
npm run ios
npm run web
npm test
npm run test:watch
```

## Expo

O projeto usa Expo SDK configurado em `package.json` e `app.json`. Para iniciar no Expo, rode `npm start` e escolha o destino pelo terminal ou pelo DevTools.

Quando alterar dependencias nativas, prefira comandos compatíveis com Expo:

```bash
npx expo install <pacote>
```

## Navegacao

A navegacao principal fica em `src/routes/AppRoutes.tsx`, usando stack navigator.

- Fluxo publico: Home, busca, login, cadastro e recuperacao de senha.
- Fluxo de locatario: catalogo, produto, favoritos, carrinho, solicitacao de locacao, pagamento e avaliacoes.
- Fluxo de locador: Home do locador, cadastro/edicao de ferramentas, minhas ferramentas e historico.
- Telas protegidas usam `withAuthGuard`, que aguarda a sessao do `AuthContext` antes de redirecionar para login.
- Algumas telas ainda recebem uma funcao `navigate(route: string)`. `AppRoutes.tsx` traduz essas chaves legadas para rotas reais do React Navigation.

## Fluxos de Usuario

Locatario:

- Busca e filtra ferramentas.
- Abre detalhes de produto.
- Favorita ferramentas.
- Adiciona itens ao carrinho.
- Solicita locacao e segue para pagamento.
- Acompanha locacoes e avalia produtos/lojas.

Locador:

- Entra na Home do locador.
- Cadastra e edita ferramentas.
- Ativa, desativa e acompanha anuncios.
- Visualiza solicitacoes, agenda e historico.

## Dados e Regras

- `AuthContext` guarda usuario autenticado e persiste sessao com AsyncStorage.
- `CatalogoContext` mantem a lista de ferramentas exibida em Home e Busca.
- `FerramentasContext` controla os anuncios do locador e sincroniza com a API.
- `CarrinhoContext` guarda itens selecionados, quantidades, dias e entrega.
- `PagamentoContext` armazena temporariamente valor, metodo, cartao e status do funil de pagamento.
- `LocacaoContext` acompanha status de locacoes e cancelamento automatico quando o prazo de pagamento expira.
- Mocks em `src/mocks` simulam catalogo, usuarios, locadores e cenarios de QA.

## Validacao

O `package.json` fornece testes com Jest:

```bash
npm test
```

Nao ha scripts configurados para `lint`, `typecheck`, `check` ou `build` neste momento.
