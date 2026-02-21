# 🏹 Secretaria Virtual - Casa de Oxóssi

Sistema de gestão interna para terreiros de Umbanda e Candomblé, desenvolvido para organizar a comunicação entre o corpo mediúnico (filhos de santo) e a administração da casa (Bàbá/Admin).

## ✨ Funcionalidades

### 👤 Área do Filho de Santo
* **Perfil Personalizado:** Gestão de nome de axé e dados de contato.
* **Agendamentos:** Solicitação de consultas (Búzios/Orientação) e acompanhamento de status em tempo real.
* **Acervo Digital:** Acesso a materiais de estudo, pontos riscados, áudios e fotos compartilhadas.
* **Segurança:** Alteração de senha e autenticação individual.

### 👑 Painel do Bàbá (Admin)
* **Gestão de Membros:** Cadastro, edição completa e exclusão de filhos de santo via cliente administrativo.
* **Controle de Agendamentos:** Aprovação, cancelamento e histórico de todos os atendimentos da casa.
* **Secretaria:** Upload de arquivos para a biblioteca comum.
* **Mural de Avisos:** Publicação de artigos e orientações no dashboard principal.

---

## 🚀 Tecnologias

* **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
* **Banco de Dados & Auth:** [Supabase](https://supabase.com/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes:** [Shadcn/UI](https://ui.shadcn.com/)
* **Ícones:** [Lucide React](https://lucide.dev/)
* **Notificações:** [Sonner](https://sonner.emilkowal.ski/)

---

## 🛠️ Configuração do Ambiente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/casa-de-oxossi.git](https://github.com/seu-usuario/casa-de-oxossi.git)
2. **Instale as dependências:**
   ```bash
   npm install
3. **Variáveis de Ambiente:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_publica
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_privada
4. **Estrutura de dados:**
   ```bash
   O sistema utiliza as seguintes tabelas no PostgreSQL:

   * profiles: Armazena os dados dos membros.
   
      * Colunas: id, full_name, email, role (admin/user), telefone.
   
   * agendamentos: Pedidos de consultas.
   
      * Colunas: id, user_id, tipo_jogo, data_agendamento, status.
   
   * arquivos_casa: Metadados dos arquivos no Storage.
   
      * artigos: Conteúdo informativo do dashboard
### 🛡️Segurança e RLS:
   
**1. Usuários:** Podem ler e editar apenas seus próprios perfis e agendamentos.

**2. Admins:** Possuem acesso total de leitura e escrita via Service Role.

**3. Integridade:** Exclusão de usuários implementada com limpeza prévia de dependências (agendamentos) para evitar erros de restrição no banco.
### 📝 Comandos:
* npm run dev: Inicia o servidor local.

* npm run build: Prepara para produção.

* npm run lint: Verifica erros no código.
  
### ⚠️ Erros Comuns:
**1. Erro de Schema Cache:**
* Se adicionar uma nova coluna no Supabase e o Next.js não reconhecer, reinicie o servidor de desenvolvimento ou limpe o cache da Vercel.

**2. Erro ao Deletar Usuário:**
* Se a exclusão falhar, verifique se a coluna user_id nas tabelas relacionadas está configurada com ON DELETE CASCADE.
