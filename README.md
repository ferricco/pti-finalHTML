# Sistema de Gestão Interna - Projeto JAVA + Web (PTI Final)

Este projeto é a continuação da aplicação desktop em **JAVA**, agora evoluída para uma **versão web** utilizando **HTML, CSS, JavaScript e Bootstrap**.

## Objetivo
Refatorar e ampliar o sistema de gestão interna desenvolvido na fase anterior, aplicando:
 - Princípios **SOLID**;
 - **Refatoração** de código;
 - Separação de responsabilidades entre camadas;
 - Implementação de uma interface **web responsiva** e moderna.

 ## Funcionalidades atuais
  - Login com hierarquia de usuários
  - Dashboard com resumo de informações
  - Cadastro de funcionários via modal (Bootstrap);
  - Armazenamento local com `localStorage`;
  - Listagem automática de funcionários;
  - Logout de sessão.

  ## Estrutura dos pacotes (Java)

  |---modelo
  | |__Funcionario.java
  |---servico
  | |__CalcularSalario.java
  |___teste
  |___FuncionarioTest.java

  ## Estrutura do projeto WEB
  
  |---index.html
  |---dashboard.html
  |---equipes.html
  |---funcionarios.html
  |---salario.html
  |---css/
  | |__estilo.css
  |--js/
  | |__login.js
  | |__funcionarios.js
  | |__dashboard.js
  | |__equipes.js
  | |__main.js
  | |__salario.js# pti-finalHTML
