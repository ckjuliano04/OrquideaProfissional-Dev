# Documentação Técnica do Frontend - Orquídea Profissional

Esta documentação descreve a arquitetura e as escolhas tecnológicas do frontend do projeto Orquídea Profissional, focado em uma experiência de alta performance e estética premium.

## 🚀 Stack Tecnológica

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router).
- **Linguagem**: JavaScript (ES6+).
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) (abordagem Utility-First de última geração).
- **Animações**: [Framer Motion](https://www.framer.com/motion/) para transições de UI e [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) para efeitos 3D.
- **Gerenciamento de Estado**: React Context API (Auth).

---

## 🏗️ Estrutura de Pastas (`src/`)

- `app/`: Rotas da aplicação, layouts e páginas (Next.js App Router).
- `components/`:
    - `ui/`: Componentes atômicos e puramente visuais (ex: `nav-header`).
    - Componentes de negócio e layout (ex: `Header`, `Footer`, `FlourParticles`).
- `contexts/`: Provedores de estado global (ex: `AuthContext`).
- `services/`: Lógica de comunicação com a API (ex: `api.js`).

---

## 🎨 Design e Identidade Visual

O projeto utiliza uma paleta de cores institucional personalizada definida no Tailwind:
- **Orquídea Green**: Cor primária profunda.
- **Orquídea Red**: Cor de destaque para ações (ex: Botão Área Restrita).
- **Orquídea Cream**: Cor de contraste para textos e elementos leves.

### Funcionalidades Premium de UI
1. **Adaptive Header**: O cabeçalho reduz de tamanho, ganha desfoque (`backdrop-blur`) e altera sua opacidade dinamicamente conforme o scroll do usuário.
2. **Sliding Pill Navigation**: Menu de navegação onde um cursor físico ("pílula") desliza suavemente entre os itens usando Framer Motion.
3. **Flour Dust Particles**: Sistema de partículas 3D interativo que simula "poeira de farinha" flutuando, reagindo ao movimento do mouse via Three.js.

---

## 🔐 Autenticação e Segurança no Client

### AuthContext (`src/contexts/AuthContext.js`)
- **JWT Storage**: Armazena o `access_token` e `refresh_token` no `localStorage`.
- **Claim Decoding**: Decodifica o payload do JWT para extrair `name`, `id` e `role` sem a necessidade de uma chamada extra de `/me`.
- **Role-Based UI**: Permite esconder ou mostrar itens do menu (como "Treinamentos") baseando-se no `user.role`.

### API Service (`src/services/api.js`)
- **Auto-Injection**: Adiciona automaticamente o cabeçalho `Authorization: Bearer <token>` em todas as requisições se o usuário estiver logado.
- **Erro 401**: Limpa os tokens localmente se o servidor retornar "Não Autorizado", forçando o re-login.

---

## 📦 Componentes Chave

### 1. `FlourParticles.js`
Utiliza um `BufferGeometry` do Three.js para renderizar milhares de partículas com alta performance.
- **Interatividade**: Calcula a distância vetorial entre cada partícula e a posição do mouse no `viewport` para criar o efeito de "repulsão".

### 2. `NavHeader.js`
Implementa a lógica de medição de largura (`getBoundingClientRect`) para posicionar o cursor animado exatamente atrás do link ativo ou sob o hover.

---

## 🛠️ Guia de Desenvolvimento

### Rodando o Projeto
```bash
cd frontend
npm install
npm run dev
```

### Criando Novas Páginas
- Crie uma pasta dentro de `src/app/` com o nome da rota (ex: `src/app/contato/page.js`).
- Utilize o componente `Layout` padrão que já inclui Header e Footer via `Providers`.

### Padrão de Estilização
- Priorize classes do Tailwind v4.
- Evite CSS inline, utilize o arquivo `globals.css` apenas para tokens globais e variáveis de fonte.
