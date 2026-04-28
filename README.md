# 🏷️ CoinWise 👨‍💻

> Sistema de mérito estudantil com moedas virtuais para incentivar desempenho acadêmico.

---

## 📝 Sobre o Projeto

O **CoinWise** é uma plataforma web desenvolvida para gerenciar um sistema de mérito acadêmico baseado em moedas virtuais.  

O sistema permite que alunos acumulem moedas por desempenho e possam trocá-las por benefícios oferecidos por empresas parceiras.

### 🎯 Problema que resolve
Muitas instituições enfrentam dificuldade em incentivar o engajamento dos alunos. O CoinWise propõe uma solução gamificada para aumentar motivação e desempenho.

### 🧠 Contexto
Projeto acadêmico desenvolvido no curso de **Engenharia de Software**.

### 💡 Diferencial
- Integração entre alunos, professores, instituições e empresas
- Sistema de recompensa gamificado
- Estrutura pronta para expansão

---

## ✨ Funcionalidades Principais

### 👨‍🎓 Aluno
- Cadastro com:
  - Nome
  - Email
  - CPF (com máscara)
  - RG (com máscara)
  - Endereço
  - Instituição (selecionada de lista pré-cadastrada)
  - Curso
- Login no sistema
- Visualização de saldo de moedas

### 🏫 Instituição
- Instituições são **pré-cadastradas no sistema**
- Servem como vínculo para alunos e professores

### 👨‍🏫 Professor
- Professores são **pré-cadastrados pela instituição**
- Cada professor possui:
  - Nome
  - CPF
  - Departamento
  - Instituição vinculada

### 🏢 Empresa Parceira
- Cadastro de empresas
- Oferta de benefícios para troca de moedas

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end
- React
- Vite
- Tailwind CSS

### 🖥️ Back-end
- Java 17
- Spring Boot
- JPA / Hibernate

### 💾 Banco de Dados
- PostgreSQL

---

## 🏗 Arquitetura

O sistema segue uma arquitetura **Full Stack com separação em camadas**:

### 🔹 Front-end
Responsável pela interface e interação com o usuário.

### 🔹 Back-end
Responsável pela lógica de negócio e regras do sistema.

### 🔹 Banco de Dados
Responsável pela persistência das informações.

---

## 🧬 Modelo de Dados (Resumo)

### Entidades principais:

- **Aluno**
  - nome, email, cpf, rg, endereco, curso
  - relacionamento com Instituição

- **Professor**
  - nome, cpf, departamento
  - relacionamento com Instituição

- **Instituição**
  - nome

- **Empresa**
  - nome, cnpj

---

## 🔗 Regras importantes do sistema

- Instituições são **pré-cadastradas**
- Professores são **cadastrados pelas instituições**
- Alunos devem selecionar uma instituição ao se cadastrar
- Cada professor está vinculado a uma instituição

---

## 🔧 Instalação e Execução

### Pré-requisitos
- Java 17+
- Node.js
- Docker (opcional)

---

### ▶️ Rodando o projeto

#### Back-end
```bash
cd backend
./mvnw spring-boot:run
```
🚀 *O Back-end estará disponível em **http://localhost:8080**.*

---

#### Terminal 2: Front-end (React, Vite)

Inicie o servidor de desenvolvimento do Front-end.

```bash
cd frontend
cd coinwise
npm run dev
# ou
yarn dev
```
🎨 *O Front-end estará disponível em **http://localhost:5173** (ou a porta configurada no Vite/CRA).*

---

### ▶️ Banco de Dados
O sistema utiliza PostgreSQL.

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/coinwise
spring.datasource.username=postgres
spring.datasource.password=123456
```



## 📂 Estrutura de Pastas

Descreva o propósito das pastas principais.

```
.
├── /frontend                    # 📁 Aplicação React
│   ├── .env.example             # 🧩 Variáveis de ambiente do Front-end.
│   ├── Dockerfile               # 🐳 Docker build do Front-end.
│   ├── .eslintrc.js             # ✨ Regras do ESLint.
│   ├── .prettierrc              # 🎨 Configuração do Prettier.
│   ├── /public                  # 📂 Arquivos estáticos e index.html.
│   ├── /src                     # 📂 Código-fonte React
│   │   ├── /components          # 🧱 Componentes reutilizáveis (UI).
│   │   ├── /pages               # 📄 Páginas/rotas da aplicação.
│   │   ├── /assets              # 🖼️ Recursos estáticos importados
│   │   │   ├── /images          # 🖼️ Imagens.
│   │   │   ├── /icons           # 💡 Ícones.
│   │   │   └── /fonts           # ✒️ Fontes personalizadas.
│   │   └── /utils               # 🛠️ Funções utilitárias.
│   ├── package.json             # 📦 Dependências e scripts.
│   └── yarn.lock / package-lock.json # 🔒 Lockfile das dependências.
│
├── /backend                     # 📁 Aplicação Spring Boot
│   ├── .env.example             # 🧩 Variáveis de ambiente do Back-end.
│   ├── Dockerfile               # 🐳 Docker build do Back-end.
│   │
│   ├── /src/main/java           # 📂 Código-fonte Java
│   │   └── /com/exemplo/app
│   │       ├── /controller      # 🎮 Endpoints REST.
│   │       ├── /service         # ⚙️ Regras e lógica de negócio.
│   │       ├── /repository      # 🗄️ Repositórios (JPA/Hibernate).
│   │       ├── /model           # 🧬 Entidades persistentes (JPA).
│   │       ├── /domain          # 🌐 Objetos de Domínio puro (sem anotações).
│   │       ├── /dto             # ✉️ Data Transfer Objects.
│   │       ├── /config          # 🔧 Configurações gerais (DB, Swagger, CORS, etc.).
│   │       ├── /exception       # 💥 Exceptions e handlers globais.
│   │       └── /security        # 🛡️ Autenticação e Autorização (Spring Security).
│   │
│   ├── /src/main/resources      # 📂 Recursos do Spring Boot
│   │   ├── application.yml         # ⚙️ Configuração principal da aplicação
│   │   ├── application-dev.yml     # 🧪 Configurações específicas do ambiente de DESENVOLVIMENTO
│   │   ├── application-prod.yml    # 🚀 Configurações específicas para PRODUÇÃO
│   │   ├── application-test.yml    # 🧪 Configurações usadas nos testes automatizados
│   │   ├── /static                # 🌐 Arquivos estáticos (HTML/CSS/JS).
│   │   ├── /templates             # 🖼️ Templates Thymeleaf/Freemarker.
│   │   ├── /messages              # 🌎 Arquivos de internacionalização (i18n).
│   │   └── /db                    # 💾 Scripts de banco usados pela aplicação
│   │       └── /migration         # 📜 Migrações do banco (Flyway/Liquibase).
│   │
│   ├── /src/test/java            # 🧪 Testes unitários e de integração.
│   └── pom.xml / build.gradle    # 🛠️ Build e dependências.
│
│
├── /docs                         # 📚 Documentação, arquitetura, modelos C4, Swagger/OpenAPI.
└── /tests                        # 🧪 Testes End-to-End (Cypress/Playwright).
```


---

## 🧪 Testes

### Testes Unitários e de Integração
Para rodar os testes da unidade e integração:


## 🔗 Documentações utilizadas

Liste aqui links para documentação técnica, referências de bibliotecas complexas ou guias de estilo que foram cruciais para o projeto.

* 📖 **Framework/Biblioteca (Front-end):** [Documentação Oficial do **React**](https://react.dev/reference/react)
* 📖 **Build Tool (Front-end):** [Guia de Configuração do **Vite**](https://vitejs.dev/config/)
* 📖 **Framework (Back-end):** [Documentação Oficial do **Spring Boot**](https://docs.spring.io/spring-boot/docs/current/reference/html/)


---

## 👥 Autores
Liste os principais contribuidores. Você pode usar links para seus perfis.

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| Nome 1  | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/user1"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user1"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user1@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |
| Nome 2  | <div align="center"><img src="https://joaopauloaramuni.github.io/image/aramunilogo.png" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/user2"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user2"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user2@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |


---

## 🤝 Contribuição
Guia para contribuições ao projeto.

1.  Faça um `fork` do projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova funcionalidade X'`). **(Utilize [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))**
4.  Faça o `push` para a branch (`git push origin feature/minha-feature`).
5.  Abra um **Pull Request (PR)**.

---

## 🙏 Agradecimentos
Em ambiente acadêmico, citar fontes e inspirações é crucial (integridade acadêmica). Em ambiente profissional, mostra humildade e conexão com a comunidade.

Gostaria de agradecer aos seguintes canais e pessoas que foram fundamentais para o desenvolvimento deste projeto:

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) - Pelo apoio institucional, estrutura acadêmica e fomento à inovação e boas práticas de engenharia.
* [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni) - Pelos valiosos ensinamentos sobre **Arquitetura de Software** e **Padrões de Projeto**.
* [**Fernanda Kipper**](https://www.instagram.com/kipper.dev/) - Pelos valiosos ensinamentos em **Desenvolvimento Web**, **DevOps** e melhores práticas em **Front-end**.
* [**Rodrigo Branas**](https://branas.io/) - Pela didática excepcional em **Clean Architecture** e **Clean Code**.
* [**Código Fonte TV**](https://codigofonte.tv/) - Pelo vasto conteúdo e cobertura de notícias, tutoriais e apoio à comunidade de **Desenvolvimento Web**.

---

## 📄 Licença

Este projeto é distribuído sob a **[Licença MIT](https://github.com/joaopauloaramuni/laboratorio-de-desenvolvimento-de-software/blob/main/LICENSE)**.

---
