# E-ShopMobile

## Sobre o projeto

E-ShopMobile é um aplicativo mobile de e-commerce desenvolvido como projeto acadêmico para a disciplina de **Mobile Development**. O aplicativo permite ao usuário fazer login, navegar por categorias de produtos masculinos e femininos, visualizar detalhes de cada produto e encerrar a sessão. Os dados são consumidos em tempo real da API pública DummyJSON.

---

## Funcionalidades

- **Login com validação** — formulário com regras de validação antes de autenticar
- **Armazenamento temporário da sessão** — estado de autenticação mantido no Redux durante a sessão
- **Listagem de produtos** — grade de produtos com suporte a múltiplas colunas (responsivo)
- **Categorias masculinas e femininas** — alternância entre abas Masculino/Feminino com chips de categoria por aba
- **Consumo da API DummyJSON** — dados buscados em tempo real com cache local de 5 minutos
- **Tela de detalhes** — galeria de imagens, informações de preço, desconto e descrição do produto
- **Navegação entre telas** — roteamento via Expo Router com proteção de rotas autenticadas
- **Logout** — encerra a sessão e redireciona para o login, limpando o estado do Redux

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React Native](https://reactnative.dev) | 0.86.3 | Base do aplicativo mobile |
| [Expo](https://expo.dev) | ~57.0.22 | Plataforma e toolchain |
| [Expo Router](https://docs.expo.dev/router/introduction/) | ~57.0.21 | Roteamento baseado em arquivos |
| [Redux Toolkit](https://redux-toolkit.js.org) | ^2.12.0 | Gerenciamento de estado global |
| [React Redux](https://react-redux.js.org) | ^9.3.0 | Integração do Redux com React |
| [Axios](https://axios-http.com) | ^1.20.0 | Requisições HTTP |
| [TypeScript](https://www.typescriptlang.org) | ~6.0.3 | Tipagem estática |
| [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) | ~57.0.5 | Renderização otimizada de imagens |
| [react-native-safe-area-context](https://docs.expo.dev/versions/latest/sdk/safe-area-context/) | ~5.7.0 | Respeito às áreas seguras do dispositivo |

---

## API utilizada

**DummyJSON** — [`https://dummyjson.com`](https://dummyjson.com)

API pública e gratuita que fornece dados fictícios de produtos para fins de desenvolvimento e testes.

### Endpoints utilizados

| Endpoint | Descrição |
|---|---|
| `GET /products/category/{slug}` | Retorna todos os produtos de uma categoria específica |
| `GET /products/{id}` | Retorna os dados completos de um único produto pelo ID |

### Categorias consumidas

**Masculino:** `mens-shirts`, `mens-shoes`, `mens-watches`, `fragrances`, `sunglasses`, `sports-accessories`

**Feminino:** `womens-bags`, `womens-dresses`, `womens-jewellery`, `womens-shoes`, `womens-watches`, `tops`, `skin-care`, `beauty`

---

## Estrutura do projeto

```
Mobile-Development/
├── assets/
│   └── images/              # Ícones e imagens estáticas
├── src/
│   ├── app/                 # Rotas (Expo Router — file-based routing)
│   │   ├── _layout.tsx      # Layout raiz com Provider Redux e guard de autenticação
│   │   ├── index.tsx        # Redirect inicial (autenticado → tabs, anônimo → login)
│   │   ├── login.tsx        # Rota de login
│   │   ├── (tabs)/          # Grupo de abas autenticadas
│   │   │   ├── _layout.tsx  # Layout das abas
│   │   │   ├── index.tsx    # Aba principal — lista de produtos
│   │   │   └── explore.tsx  # Aba de exploração
│   │   └── product/
│   │       └── [id].tsx     # Rota dinâmica de detalhe do produto
│   ├── components/
│   │   ├── products/        # Componentes da listagem
│   │   │   ├── CategoryPicker.tsx   # Chips horizontais de categoria
│   │   │   ├── GenderTabBar.tsx     # Tabs Masculino/Feminino
│   │   │   └── ProductCard.tsx      # Card individual de produto
│   │   ├── ui/              # Componentes reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Input.tsx
│   │   │   └── LoadingIndicator.tsx
│   │   ├── app-tabs.tsx     # Navegação por abas (nativo)
│   │   └── app-tabs.web.tsx # Navegação por abas (web)
│   ├── constants/
│   │   └── theme.ts         # Cores, espaçamentos e tipografia
│   ├── hooks/
│   │   ├── use-logout.ts        # Hook de logout com limpeza do Redux
│   │   ├── use-product-detail.ts # Hook para buscar detalhe do produto
│   │   ├── use-products.ts      # Hook principal de listagem e cache
│   │   ├── use-theme.ts         # Hook de acesso ao tema atual
│   │   ├── use-app-dispatch.ts  # Hook tipado do Redux dispatch
│   │   └── use-app-selector.ts  # Hook tipado do Redux selector
│   ├── screens/
│   │   ├── login/
│   │   │   ├── LoginScreen.tsx       # Tela de login
│   │   │   ├── login.service.ts      # Lógica de autenticação
│   │   │   └── login.validation.ts   # Regras de validação do formulário
│   │   └── products/
│   │       ├── ProductListScreen.tsx   # Tela de listagem de produtos
│   │       └── ProductDetailScreen.tsx # Tela de detalhe do produto
│   ├── services/
│   │   ├── api.ts                # Instância centralizada do Axios
│   │   └── products.service.ts   # Funções de acesso à API de produtos
│   ├── store/
│   │   ├── index.ts              # Configuração do store Redux
│   │   └── slices/
│   │       ├── authSlice.ts      # Estado de autenticação
│   │       └── productsSlice.ts  # Estado de produtos, categorias e cache
│   └── utils/
│       └── price.ts              # Utilitários de formatação e cálculo de preço
├── app.json                 # Configuração do Expo
└── package.json
```

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org) instalado
- [Expo Go](https://expo.dev/go) no dispositivo (para testar em celular) ou emulador configurado

### Instalação e execução

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start
```

Após iniciar, o terminal exibirá um QR code. Escaneie com o aplicativo **Expo Go** (Android/iOS) para abrir no dispositivo, ou pressione:

- `w` — abrir no navegador (web)
- `a` — abrir no emulador Android
- `i` — abrir no simulador iOS

---

## Fluxo do aplicativo

```
Login → Lista de Produtos → Detalhe do Produto → (voltar) → Lista de Produtos
                                                                      ↓
                                                                   Logout
                                                                      ↓
                                                                    Login
```

1. **Login** — usuário insere credenciais, que são validadas antes do envio
2. **Lista de Produtos** — exibe produtos da categoria ativa com filtros por gênero e categoria
3. **Detalhe do Produto** — galeria de imagens, preço com desconto e informações do produto
4. **Logout** — limpa o estado da sessão e retorna à tela de login

---

## Screenshots

> _Adicione os prints reais do aplicativo abaixo._

| Tela |
|---|---|
| Login |
| Lista de Produtos — Masculino |
| Lista de Produtos — Feminino |
| Detalhe do Produto |

---

## Observações

Este projeto foi desenvolvido exclusivamente para fins **acadêmicos**, como parte da disciplina de Mobile Development. Os dados exibidos são fictícios e fornecidos pela API pública DummyJSON. Nenhuma transação real é realizada.
