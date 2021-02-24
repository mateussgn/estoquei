Feature: Editar Meu Perfil
    Como vendedor, gostaria de editar no meu perfil, minhas informações de cadastro.

Scenario: Navegação da tela de ‘Meu Perfil’ para ‘Editar Perfil‘
    Given “Marco” é um usuário do tipo “Vendedor”
    And “Marco” está registrado com a “foto de perfil” “user_marco.png”
    And “Marco” está registrado com o “Email”: “marco@cin.com”
    And “Marco” está registrado com o "Nome": “Marco Santana”
    And “Marco” está na tela de "Meu Perfil".
    Then eu consigo visualizar a opção “Editar Perfil”
    When eu clico na opção "Editar Perfil”
    Then eu sou direcionado para a página “Editar Perfil”
    And eu consigo visualizar o campo “foto de perfil” de “Marco” preenchido com “user_marco.png”
    And eu consigo visualizar o campo “Nome” de “Marco” preenchido com "Marco Santana"
    And eu consigo visualizar o campo “Email” de “Marco” preenchido com "marco@cin.com"