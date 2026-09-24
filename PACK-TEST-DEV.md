# PACK TEST DEV


Durante a resolução do backlog (especificamente a demanda **"Realizar testes no filtro"**), o projeto não tinha nenhuma stack de testes configurada. Foram adicionadas 3 bibliotecas, todas como `devDependencies` — ou seja, **não vão para o app publicado**, só existem no ambiente de desenvolvimento.

## `jest`

A biblioteca de testes em si (test runner). É quem lê os arquivos `*.test.ts`, executa os blocos `describe`/`it`, roda os `expect(...)` e mostra o resultado (quantos testes passaram/falharam).

- Comando pra rodar: `npm test`
- Versão adicionada: `^29.7.0`

## `jest-expo`

Um **preset** (configuração pronta) do Jest feito pela própria equipe do Expo, específico pra projetos React Native/Expo. Sem ele, o Jest não sabe lidar com coisas como:
- Sintaxe do React Native (JSX, `StyleSheet`, etc.)
- Módulos nativos do Expo (câmera, ícones, fontes, etc.) — ele simula ("mocka") essas partes automaticamente
- Transformação de TypeScript nos arquivos de teste

Foi escolhido em vez de configurar Jest "na mão" (babel-jest, ts-jest, mocks manuais) porque é o padrão recomendado oficialmente pelo Expo e já vem pronto pra funcionar com a versão do Expo que o projeto usa (SDK 57).

- Versão adicionada: `~57.0.5` (pareada com a versão do Expo do projeto)

## `@types/jest`

Não é uma biblioteca de teste em si — são só as **definições de tipos do TypeScript** pra API do Jest (`describe`, `it`, `expect`, `beforeEach`, etc). Sem isso, o TypeScript (e o autocomplete do editor) não reconhece essas funções como globais nos arquivos de teste e acusa erro de tipo, mesmo os testes rodando normalmente.

- Versão adicionada: `^29.5.14`

---

## O que foi configurado no `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "jest-expo": "~57.0.5"
  },
  "jest": {
    "preset": "jest-expo",
    "testPathIgnorePatterns": ["/node_modules/", "/android/", "/ios/"]
  }
}
```

E no `tsconfig.json`, foi adicionado `"types": ["jest"]` pra o TypeScript carregar os tipos globais dos testes.
