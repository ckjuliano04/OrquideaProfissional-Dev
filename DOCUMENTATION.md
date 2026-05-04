# Documentação Técnica - Orquídea Profissional

Este documento descreve a arquitetura, estrutura de dados e fluxos de negócio do portal Orquídea Profissional.

---

## 1. Arquitetura Geral
O projeto é dividido em duas partes principais:
*   **Backend**: Django REST Framework (Python) atuando como API e sistema de gerenciamento de conteúdo (CMS).
*   **Frontend**: Next.js (React) focado na experiência do usuário final e área restrita.

---

## 2. Banco de Dados
O sistema utiliza um banco de dados **Microsoft SQL Server (MSSQL)** legado. 
**Nota Importante**: A maioria das tabelas está configurada com `managed = False` no Django, o que significa que o ORM não altera a estrutura das tabelas. Qualquer alteração de esquema deve ser feita diretamente no banco de dados.

### Principais Tabelas:
*   **users**: Armazena os usuários (Administradores, Vendedores, Técnicos e Clientes). Possui campos como `user_type` para controle de acesso.
*   **products**: Cadastro principal de produtos, incluindo slugs para URLs amigáveis.
*   **product_categories**: Organização dos produtos em linhas (Farinhas, Misturas, etc).
*   **product_images**: Galeria de fotos adicionais dos produtos.
*   **product_files**: Documentos técnicos (PDFs, Manuais) vinculados a produtos, com controle de papel (Role).
*   **training_materials**: Conteúdos de vídeo e texto para treinamento de técnicos e vendedores.
*   **uploads**: Tabela central de arquivos de mídia.

---

## 3. Autenticação e Segurança
A autenticação é baseada em **JWT (JSON Web Token)**.

### Papéis de Usuário (`user_type`):
1.  **admin / interno**: Acesso total ao portal e ao CMS (Django Admin).
2.  **tecnico**: Acesso à área restrita e treinamentos técnicos.
3.  **vendedor**: Acesso à área restrita e materiais de apoio a vendas.
4.  **cliente**: Acesso básico à área restrita e detalhes de produtos.

### Restrições de Acesso:
*   **CMS (Admin)**: Apenas usuários `admin` e `interno` (propriedade `is_staff`) podem acessar `/admin/`.
*   **Detalhes do Produto**: Apenas usuários logados podem visualizar a página de detalhes de um produto. No frontend, usuários não logados veem apenas a vitrine informativa.
*   **Treinamentos**: Restritos a perfis profissionais específicos via permissão `IsTecnicoOrVendedor`.

---

## 4. CMS (Django Admin)
O painel administrativo foi personalizado para a equipe de marketing:
*   **Upload de Imagens**: O campo `image_url` foi convertido de CharField para ImageField, permitindo upload direto com preview.
*   **Organização**: Uso de `fieldsets` para agrupar campos logicamente.
*   **Nomenclatura**: Todos os modelos usam `verbose_name` em português para facilitar a navegação.

---

## 5. Fluxos de Mídia
*   **Armazenamento**: Localizado em `/media/uploads/`.
*   **Configuração**: `MEDIA_URL` e `MEDIA_ROOT` definidos no Django; servido via `static()` em ambiente de debug.
*   **APIs**: Os serializers retornam URLs absolutas (com domínio) para garantir que as imagens carreguem corretamente no Next.js.

---

## 6. Desenvolvimento Local

### Backend:
1. Ativar venv: `.\venv\Scripts\activate`
2. Instalar dependências: `pip install -r requirements.txt` (inclui Pillow, Django, DRF, mssql-django)
3. Rodar: `python manage.py runserver`

### Frontend:
1. Pasta: `cd frontend`
2. Instalar: `npm install`
3. Rodar: `npm run dev`

---

## 7. Scripts Úteis
*   **bulk_upload_images.py**: Realiza o mapeamento e upload em lote de imagens da pasta `3d/` para os produtos no banco de dados.
*   **check_schema.py**: Script auxiliar para verificar as colunas reais das tabelas no MSSQL legado.
