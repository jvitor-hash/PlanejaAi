# PlanejaAi - Gerenciador de Tarefas

Sistema de organização de tarefas desenvolvido com Node.js, Express, e Sqlite3 (Sequelize).

## Tecnologias utilizadas

- Node.js
- Express 5
- Bcrypt
- Express-session
- Sequelize (ORM)
- Sqlite3
- Vue-JS
- Nodemon (ambiente de desenvolvimento)

## Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/JuanCano015/Projeto-final-DS.git
cd Projeto-final-DS
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo chamado `.env` na raiz do projeto (mesmo nível do `package.json`) com o seguinte conteúdo:

```env
SESSION_SECRET=super-secret-key
PORT=3000
```

> As tabelas são criadas automaticamente pelo Sequelize ao iniciar o servidor.

## Executando o projeto

Para rodar em modo de desenvolvimento (com reinício automático a cada alteração):

```bash
npm run dev
```

O servidor estará disponível em:

```
Back-End: http://localhost:3000
Front-End: http://localhost:5173
```

## Estrutura do projeto

```
PlanejaAi/
├── Back-End/
│   ├── middleware/
│   │   ├── auth.js
│   │   └── session.js
│   ├── models/
│   │   ├── teamMembershipModel.js
│   │   ├── teamModel.js
│   │   ├── ticketActivityModel.js
│   │   ├── ticketAssignmentModel.js
│   │   ├── ticketModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── teamMembershipRoutes.js
│   │   ├── teamRoutes.js
│   │   ├── ticketActivityRoutes.js
│   │   ├── ticketAssignmentRoutes.js
│   │   ├── ticketRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── teamMembershipService.js
│   │   ├── teamService.js
│   │   ├── ticketActivityService.js
│   │   ├── ticketAssignmentService.js
│   │   ├── ticketService.js
│   │   └── userService.js
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── db.js
├── Front-End/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   └── userProfile.png
│   │   │   └── main.css
│   │   ├── components/
│   │   │   ├── activityItem.vue
│   │   │   ├── barChart.vue
│   │   │   ├── bestPerfomance.vue
│   │   │   ├── card.vue
│   │   │   ├── filterChips.vue
│   │   │   ├── floatingAction.vue
│   │   │   ├── formGroup.vue
│   │   │   ├── lineChart.vue
│   │   │   ├── modalPanel.vue
│   │   │   ├── navButton.vue
│   │   │   ├── pieChart.vue
│   │   │   ├── popover.vue
│   │   │   ├── profileCard.vue
│   │   │   ├── StatsCounter.vue
│   │   │   ├── teamCard.vue
│   │   │   ├── themeSwitch.vue
│   │   │   ├── ticket.vue
│   │   │   ├── toolTip.vue
│   │   │   └── userProfile.vue
│   │   ├── composable/
│   │   │   ├── services/
│   │   │   │   ├── useTeamMembershipService.js
│   │   │   │   ├── useTeamService.js
│   │   │   │   ├── useTicketActivityService.js
│   │   │   │   ├── useTicketAssignmentService.js
│   │   │   │   ├── useTicketService.js
│   │   │   │   └── useUserService.js
│   │   │   └── useFetch.js
│   │   ├── layout/
│   │   │   ├── Activities.vue
│   │   │   ├── Graphs.vue
│   │   │   ├── Header.vue
│   │   │   └── Sidebar.vue
│   │   ├── pages/
│   │   │   ├── communication.vue
│   │   │   ├── home.vue
│   │   │   ├── login.vue
│   │   │   ├── register.vue
│   │   │   ├── tasks.vue
│   │   │   └── teams.vue
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── stores/
│   │   │   ├── teamMembershipStore.js
│   │   │   ├── teamStore.js
│   │   │   ├── ticketActivityStore.js
│   │   │   ├── ticketStore.js
│   │   │   └── userStore.js
│   │   ├── App.vue
│   │   └── main.ts
│   └── index.html
```

## Funcionalidades

- Listagem de tarefas
- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Filtro por categoria, status e data de entrega
- Criação de equipes
- Edição de equipes
- Exclusão de equipes

## Autores

João Vitor Alves.
(Nota): Todas as decisões técnicas foram tomadas e desenvolvidas por mim.
