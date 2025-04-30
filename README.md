# FURIA Fan App

![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Aplicação web para fãs da FURIA, com registro de usuários, upload de documentos, integração social e notificações. Feita com foco em experiência do usuário e integração com serviços modernos.

## ✨ Tecnologias Utilizadas
- **Next.js** (React)
- **TypeScript**
- **Tailwind CSS**
- **Resend** (envio de e-mails)
- **Jest** + **Testing Library** (testes)

## ⚡ Pré-requisitos
- Node.js >= 18.x
- npm >= 9.x

## 🚀 Instalação e Uso
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/furia-fan-app.git
   cd furia-fan-app
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   RESEND_API_KEY=sua_api_key
   ```
4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse em [http://localhost:3000](http://localhost:3000)

## 📂 Estrutura de Pastas
- `/components`: Componentes de UI e etapas do registro
- `/app`: Rotas, APIs e páginas
- `/lib`: Utilitários e integrações (ex: Resend)
- `/hooks`: Hooks customizados
- `/types`: Tipos globais compartilhados
- `/public`: Assets estáticos (imagens, logos)

## 🏆 Funcionalidades
- Cadastro de usuário com validação e múltiplos passos
- Upload de documentos e imagens
- Integração com redes sociais
- Notificações e envio de e-mails
- Interface responsiva e moderna

## 🧪 Testes
- Execute os testes unitários e de integração:
  ```bash
  npm run test
  ```
  Recomenda-se Jest + Testing Library. Adicione novos testes em `/__tests__`.

## 🤝 Contribuição
Pull requests são bem-vindos! Para contribuir:
1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push na branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença
Projeto sob licença MIT.

## 📬 Contato
Dúvidas, sugestões ou problemas? Abra uma issue ou envie um e-mail para [seuemail@dominio.com].

---
> Projeto mantido por fãs, sem afiliação oficial à FURIA.
