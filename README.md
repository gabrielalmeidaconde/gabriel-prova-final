# Sistema de Cursos

API REST + Frontend para gerenciamento de cursos universitários, com autenticação via Auth0 e controle de acesso por papéis (ADMIN / USER).

---

## Estrutura

```
gabriel-prova-final/
├── backend/    # Node.js + Express + Prisma (SQLite)
├── frontend/   # React + Vite + Tailwind CSS
└── .github/workflows/  # CI/CD com GitHub Actions
```

---

## Configuração do Auth0

### 1. Criar API no Auth0
- Dashboard → Applications → APIs → Create API
- Nome: `Courses API`
- Identifier (Audience): `https://courses-api`
- Ativar **"Enable RBAC"** e **"Add Permissions in the Access Token"**

### 2. Criar Application (SPA)
- Applications → Create Application → Single Page Application
- Allowed Callback URLs: `http://localhost:5173, https://SEU-DOMINIO-VERCEL.vercel.app`
- Allowed Logout URLs: mesmos valores acima
- Allowed Web Origins: mesmos valores acima

### 3. Criar Papéis
- User Management → Roles → Create Role
- Criar: `ADMIN` e `USER`
- Atribuir papéis aos usuários

### 4. Criar Action para adicionar papéis ao token
- Actions → Flows → Login → Add Action (Custom)
- Cole o código abaixo e faça deploy:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://courses-app.com';
  if (event.authorization) {
    api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(`${namespace}/email`, event.user.email);
  }
};
```

---

## Rodando Localmente

### Backend

```bash
cd backend
cp .env.example .env
# Edite .env com seus dados do Auth0
npm install
npm run db:push
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
# Edite .env com seus dados do Auth0
npm install
npm run dev
```

---

## Deploy

### Backend — Render (via GitHub Actions)

1. Crie um Web Service no [Render](https://render.com) apontando para este repositório
2. Root Directory: `backend`
3. Build Command: `npm install && npm run db:generate && npm run db:migrate`
4. Start Command: `npm start`
5. Adicione as variáveis de ambiente no Render
6. Copie o **Deploy Hook URL** do Render
7. No GitHub: Settings → Secrets → Actions → Novo secret `RENDER_DEPLOY_HOOK_URL`

### Frontend — Vercel

1. Importe o repositório no [Vercel](https://vercel.com)
2. Root Directory: `frontend`
3. Adicione as variáveis de ambiente (`VITE_*`)
4. Deploy automático a cada push na `main`

---

## Rotas da API

| Método | Rota | Papel |
|--------|------|-------|
| `GET` | `/courses` | ADMIN, USER |
| `POST` | `/courses` | ADMIN |
| `DELETE` | `/courses/:id` | ADMIN |
