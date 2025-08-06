# 🏗️ Arquitetura do Projeto - Cubos Movie App

## 🎯 Visão Geral

Este documento explica as decisões arquiteturais e organizacionais tomadas para o desenvolvimento da nova versão do TonhoFlix, agora chamada **Cubos Movie App**, utilizando **React**, **TypeScript** e **Next.js**.

## 📚 Stack Tecnológica

### 🔧 Tecnologias Principais
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **Radix Colors** - Sistema de cores acessível

### 📦 Dependências Essenciais
- **@tanstack/react-query** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado cliente
- **Axios** - Cliente HTTP para APIs
- **Lucide React** - Biblioteca de ícones
- **clsx + tailwind-merge** - Utilitários para classes CSS

## 🗂️ Estrutura de Pastas

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais + Radix Colors
│   ├── layout.tsx         # Layout raiz da aplicação
│   └── page.tsx           # Página inicial (lista de filmes)
├── components/
│   ├── ui/                # Componentes de interface reutilizáveis
│   └── layout/            # Componentes de layout (Header, Footer)
├── hooks/                 # Custom hooks React
├── lib/
│   └── utils.ts          # Utilitários (cn function para classes)
├── services/
│   └── api/              # Serviços de API (TMDB)
├── stores/               # Stores Zustand (estado global)
├── types/                # Definições TypeScript
└── utils/                # Funções utilitárias
```

## 🧠 Decisões Arquiteturais

### 1. **Next.js App Router**
**Por quê:** 
- Roteamento moderno e mais performático
- Server Components por padrão
- Streaming e Suspense nativos
- Melhor SEO out-of-the-box

### 2. **TypeScript**
**Por quê:**
- Detecção de erros em tempo de desenvolvimento
- Melhor experiência de desenvolvedor (IntelliSense)
- Documentação automática através dos types
- Refatoração mais segura

### 3. **Tailwind CSS**
**Por quê:**
- Desenvolvimento mais ágil com utility classes
- Melhor performance (purge de CSS não utilizado)
- Consistência visual através do design system
- Responsividade simplificada

### 4. **Radix Colors**
**Por quê:**
- Sistema de cores scientificamente projetado
- Acessibilidade garantida (contraste adequado)
- Temas claro/escuro nativos
- Escalas de cores consistentes (1-12)

### 5. **React Query (@tanstack/react-query)**
**Por quê:**
- Cache inteligente de dados da API
- Refetch automático em background  
- Estados de loading/error padronizados
- Sincronização automática entre componentes

### 6. **Zustand**
**Por quê:**
- Estado global simples e performático
- TypeScript first-class
- Boilerplate mínimo comparado ao Redux
- Persist middleware para localStorage

## 🎨 Sistema de Design

### Cores e Temas
- **Tema padrão:** Escuro (conforme especificação)
- **Escalas:** Gray (1-12) e Blue (1-12) do Radix
- **Semântica:** Mapeamento de cores para propósitos específicos
- **Responsividade:** Breakpoints customizados (414px, 1366px)

### Tipografia
- **Font:** System fonts para performance
- **Escala:** Baseada no Tailwind com customizações

## 🔗 Integração com API

### TMDB API
- **Base URL:** `https://api.themoviedb.org/3`
- **Autenticação:** API Key via variável de ambiente
- **Idioma:** Português brasileiro (pt-BR)
- **Endpoints principais:**
  - `/movie/popular` - Filmes populares
  - `/search/movie` - Busca de filmes
  - `/discover/movie` - Descoberta com filtros
  - `/movie/{id}` - Detalhes do filme

### Tratamento de Imagens
- **CDN:** `https://image.tmdb.org/t/p/`
- **Tamanhos:** w500, w780, original
- **Fallback:** Placeholder para imagens indisponíveis

## 📱 Responsividade

### Estratégia Mobile-First
1. **Mobile (414px):** Layout em coluna única
2. **Intermediário:** Adaptação progressiva
3. **Desktop (1366px+):** Layout em grid completo

### Pontos de Quebra Customizados
- `xs: 414px` - Mobile conforme design
- `desktop: 1366px` - Desktop conforme design
- Padrões Tailwind para tamanhos intermediários

## 🎭 Gerenciamento de Estado

### Estado Local (React)
- `useState` para estado de componente
- `useEffect` para side effects
- Custom hooks para lógica reutilizável

### Estado Global (Zustand)
- **Theme Store:** Tema claro/escuro
- **Filtros:** Estados de busca e filtros
- **User Preferences:** Configurações do usuário

### Estado Servidor (React Query)
- **Movies:** Cache de listas de filmes
- **Movie Details:** Cache de detalhes individuais
- **Genres:** Cache de gêneros disponíveis

## 🔒 Boas Práticas de Segurança

### Variáveis de Ambiente
- API keys sempre em `.env.local`
- Prefixo `NEXT_PUBLIC_` apenas quando necessário
- `.env.example` para documentação

### Validação de Dados
- Types TypeScript para validação em compilação
- Tratamento de erros da API
- Fallbacks para dados indisponíveis

## 🚀 Performance

### Otimizações
- **Code Splitting:** Automático via Next.js
- **Image Optimization:** Componente Image do Next.js
- **CSS Purging:** Automático via Tailwind
- **Bundle Analysis:** Disponível via Next.js

### Estratégias de Cache
- **React Query:** Cache de dados da API
- **Next.js:** Cache de páginas estáticas
- **CDN:** Imagens via TMDB CDN

## 🧪 Testabilidade

### Estrutura Preparada
- Componentes pequenos e focados
- Hooks personalizados isolados
- Separação clara de responsabilidades
- Types explícitos para mock de dados

## 📈 Escalabilidade

### Preparação para Crescimento
- **Monorepo Ready:** Estrutura permite micro-frontends
- **Component Library:** UI components reutilizáveis
- **Design System:** Tokens consistentes
- **API Abstraction:** Fácil troca de providers

## 🔄 Migração do Projeto Anterior

### Evolução Arquitetural
| Aspecto | Versão Anterior | Nova Versão |
|---------|----------------|-------------|
| **Framework** | Vanilla JS | Next.js + React |
| **Tipagem** | Sem tipagem | TypeScript |
| **Estado** | DOM + variáveis globais | Zustand + React Query |
| **Estilização** | CSS manual | Tailwind + Radix Colors |
| **Responsividade** | Media queries manuais | Mobile-first + Tailwind |
| **Performance** | Sem otimizações | Code splitting + caching |

## 💡 Próximos Passos

1. **Implementação dos Componentes UI**
2. **Criação do Header com busca e toggle de tema**
3. **Desenvolvimento dos filtros personalizados**
4. **Página de detalhes do filme**
5. **Testes e refinamentos de UX**

---

Esta arquitetura foi pensada para ser **escalável**, **maintível** e **performática**, seguindo as melhores práticas atuais do ecossistema React/Next.js e atendendo aos requisitos específicos do desafio técnico da Cubos.