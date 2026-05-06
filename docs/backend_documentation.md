# Documentação Técnica do Backend - Orquídea Profissional

Esta documentação serve como guia de manutenção para desenvolvedores que atuarão no backend do projeto Orquídea Profissional. O sistema é construído sobre o framework **Django** com **Django Rest Framework (DRF)**.

## 📁 Estrutura do Projeto

O projeto segue uma estrutura modular, separando responsabilidades por "apps":

- `core/`: Configurações centrais do Django (`settings.py`, `urls.py`).
- `apps/`: Contém a lógica de negócio dividida em módulos:
    - `users/`: Autenticação customizada, permissões e perfis.
    - `products/`: Catálogo, categorias e ativos de produtos.
    - `content/`: Páginas institucionais, marcas e lojas.
    - `training/`: Materiais restritos, vídeos e arquivos de treinamento.
    - `core_media/`: Centralização de registros de upload.
- `cms/`: Customizações específicas para o painel administrativo.
- `media/`: Diretório de armazenamento de arquivos enviados.
- `static/`: Arquivos estáticos do painel administrativo.

---

## 🔐 Autenticação e Segurança

### Legacy MSSQL Backend (`apps.users.backends.LegacyMSSQLBackend`)
Como o banco de dados é legado (SQL Server), utilizamos um backend de autenticação customizado para validar as senhas que estão em formato **BCrypt**. O Django nativamente usa PBKDF2, por isso essa ponte é essencial.

### JWT (JSON Web Token)
A comunicação com o frontend (Next.js) é feita via JWT.
- **Tokens**: Gerados pelo `rest_framework_simplejwt`.
- **Claims**: O payload do token inclui o `user_id` e o `user_type` (role), permitindo ao frontend gerenciar a UI dinamicamente.

### Permissões Customizadas (`apps.users.permissions`)
Utilizamos classes de permissão do DRF para restringir endpoints:
- `IsClienteOrAbove`: Qualquer usuário autenticado e ativo.
- `IsTecnicoOnly`: Apenas usuários com `user_type` em `['tecnico', 'admin', 'interno']`.
- `IsAdmin`: Restringe a administradores.

---

## 🛠️ Lógica das Aplicações (Apps)

### 1. Produtos (`apps/products`)
- **Models**: Mapeiam as tabelas legadas. Note que `image_url` é um `ImageField` para novos uploads, mas armazena caminhos compatíveis com o legado.
- **Views**: Utilizam `generics.ListAPIView` e `generics.RetrieveAPIView`.
- **Filtros**: Implementados no método `get_queryset` para filtragem por categoria e produtos em destaque.

### 2. Usuários (`apps/users`)
- **Custom User Model**: A classe `Users` herda de `AbstractBaseUser` para suportar o schema legado (campos como `password_hash` em vez de `password`).
- **UserManager**: Sobrescreve a criação de usuários para garantir compatibilidade.

### 3. Treinamento (`apps/training`)
- Gerencia o conteúdo da "Área Restrita".
- **Hierarquia**: Um `RestrictedMaterial` pode ter múltiplos `RestrictedFiles` (arquivos) e `RestrictedVideos` (links).
- **Visibilidade**: Controlada pela tabela de ligação `RestrictedMaterialRoles`, definindo qual perfil vê qual conteúdo.

---

## 📤 Fluxo de Mídia (Uploads)

O sistema possui uma centralização de arquivos:
1. Arquivos são registrados na tabela `uploads` via `apps.core_media`.
2. Outros módulos (Produtos, Treinamento) vinculam-se a esses registros via `ForeignKey`.
3. Caminhos físicos: `/media/uploads/{categoria}/{arquivo}`.

---

## 🚀 Guia de Manutenção

### Adicionando um Novo Endpoint
1. Defina o **Serializer** em `serializers.py` da app correspondente.
2. Crie a **View** em `views.py` (prefira `generics` do DRF).
3. Registre a rota em `urls.py`.
4. Defina a classe de permissão adequada em `permission_classes`.

### Modificando o Banco de Dados
- Como `managed = False` está ativo na maioria dos models, alterações no banco devem ser feitas via script SQL direto no MSSQL ou via ferramentas de migração externa.
- Após alterar o banco, atualize o model no Django para refletir os novos campos.

### Deploy e Ambiente
- Variáveis de ambiente são geridas via `.env`.
- Conexão com SQL Server exige o driver `ODBC Driver 18 for SQL Server`.

---

## 📝 Convenções de Código
- **Serializers**: Use `SerializerMethodField` para transformar caminhos relativos de imagem em URLs absolutas para o frontend.
- **Consultas**: Sempre filtre por `is_active=True` em endpoints públicos.
- **Docs**: Mantenha as docstrings das Views atualizadas para facilitar a leitura da API.
