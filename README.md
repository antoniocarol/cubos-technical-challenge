# 🎬 Cubos Movie App

> **Desafio Técnico - Processo Seletivo Cubos**

Uma aplicação web responsiva para pesquisa e visualização de filmes, desenvolvida com React, TypeScript e Next.js, consumindo a API do TMDB (The Movie Database).

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Radix Colors** - Sistema de cores acessível
- **React Query** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado cliente
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Chave da API do TMDB

## ⚙️ Configuração

1. **Clone o repositório**
```bash
git clone <repository-url>
cd cubos-movie-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local e adicione sua chave da API do TMDB
NEXT_PUBLIC_TMDB_API_KEY=sua_chave_aqui
```

4. **Obtenha sua chave da API TMDB**
   - Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Crie uma conta e solicite uma chave de API
   - Adicione a chave no arquivo `.env.local`

5. **Configuração de Imagens**
   - As imagens do TMDB já estão configuradas no `next.config.ts`
   - Domínio `image.tmdb.org` autorizado para otimização
   - Fallbacks automáticos para imagens indisponíveis

## 🏃‍♂️ Executando o Projeto

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar build de produção
npm start

# Linting
npm run lint
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📱 Funcionalidades

### ✅ Implementadas
- [x] Estrutura base do projeto
- [x] Configuração do Radix Colors
- [x] Sistema de temas (claro/escuro)
- [x] Integração com API TMDB
- [x] TypeScript completo
- [x] Responsividade mobile-first

### ✅ Funcionalidades Implementadas
- [x] Página de pesquisa de filmes com busca em tempo real
- [x] Sistema de filtros personalizados (gênero, ano, ordenação)
- [x] Paginação completa (20 itens por página - padrão TMDB)
- [x] Página de detalhes do filme com informações completas
- [x] Sistema de temas claro/escuro funcional
- [x] Grid responsivo para diferentes telas
- [x] MovieCards com hover effects e rating circular
- [x] Tratamento de erros e estados de loading
- [x] Integração completa com TMDB API

## 🏗️ Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js 13+)
├── components/
│   ├── ui/             # Componentes de interface
│   └── layout/         # Componentes de layout
├── hooks/              # Custom hooks
├── lib/                # Utilitários
├── services/api/       # Serviços de API
├── stores/             # Estado global (Zustand)
├── types/              # Definições TypeScript
└── utils/              # Funções utilitárias
```

## 🎨 Design System

### Cores
- **Sistema:** Radix Colors (Gray + Blue scales)
- **Tema padrão:** Escuro
- **Acessibilidade:** Contraste garantido

### Responsividade
- **Mobile:** 414px (conforme Figma)
- **Desktop:** 1366px (conforme Figma)
- **Estratégia:** Mobile-first

## 📖 Documentação

- [**ARCHITECTURE.md**](./ARCHITECTURE.md) - Documentação detalhada da arquitetura
- [Figma Design](link-do-figma) - Design de referência
- [TMDB API Docs](https://developer.themoviedb.org/docs) - Documentação da API

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Executar build
npm run lint         # ESLint
npm run type-check   # Verificação de tipos TypeScript
```

## 🌟 Funcionalidades Principais

1. **Pesquisa de Filmes**
   - Lista padrão de filmes populares
   - Busca por texto
   - Filtros personalizados

2. **Detalhes do Filme**
   - Informações completas
   - Orçamento, receita, gêneros
   - Responsivo e otimizado

3. **Temas**
   - Alternância claro/escuro
   - Persistência no localStorage
   - Baseado em Radix Colors

## 🤝 Contribuição

Este é um projeto de desafio técnico. Para dúvidas ou sugestões, entre em contato.

## 📄 Licença

Este projeto foi desenvolvido como parte de um processo seletivo.
# cubos-technical-challenge
