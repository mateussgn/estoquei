Feature: Gerenciamento de vendas
    Como vendedor, gostaria de registrar minhas vendas e o valor no sistema, verificar se há estoque do produto, ver quais são as características do produto e opções de pagamento

Scenario: Registrar uma venda
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “produto vendido” 
    And eu informo que vendi o “produto 1” em quantidade “2” pelo valor de “R$45,90”, com forma de pagamento “parcelado” em parcelas de “12x” no dia "2021-02-25"
    Then o sistema mostra uma mensagem de “Venda cadastrada no banco de dados”

Scenario: Ver a quantidade de um produto no estoque
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “informação sobre produtos” 
    And eu seleciono o produto “produto 1”
    Then eu sou direcionado para a página “informações”
    And eu seleciono “visualizar informações de estoque” 
    Then o sistema mostra a quantidade de “produto 1” no estoque

Scenario: Verificar informações do produto
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “informação sobre produtos” 
    And eu seleciono produto “produto 1”
    Then eu sou direcionado para a página “informações”
    And eu seleciono “visualizar informações do produto 1” 
    Then o sistema retorna os campos "descrição" com o valor “TV 45 Polegadas LG” e "avaliação" com o valor “4,5/5”, associado ao “produto 1” 

Scenario: Enviar relatório de vendas mensal
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “enviar relatório mensal” 
    Then eu sou direcionado para a página “relatórios”
    And eu envio “relatorio_mensal_vendedor.xlsx” 
    Then o sistema mostra a mensagem “relatório recebido”

Scenario: Registrar uma venda à vista com valor de parcelas
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “produto vendido” 
    And eu informo que vendi o “produto 1” em quantidade “2” pelo valor de “R$45,90”, com forma de pagamento “à vista” em parcelas de “12x”
    Then o sistema mostra uma mensagem de “Erro! Voce selecionou pagamento à vista e adicionou parcelas”

Scenario: Envio de relatório em formato indevido
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “enviar relatório mensal” 
    Then eu sou direcionado para a página “relatórios”
    And eu envio “relatorio_mensal_vendedor.pdf” 
    Then o sistema mostra a mensagem “relatório enviado no formato errado! Por favor, envie novamente em xlsx”
    And redireciona "Samuel" para “Página de Gerenciamento de Vendas”

Scenario: Ver histórico de vendas de um produto da loja
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “informação sobre produtos” 
    And eu seleciono produto “produto 1”
    Then eu sou direcionado para a página “informações”
    And eu seleciono “visualizar histórico de vendas do produto 1” 
    Then o sistema mostra todas as vendas realizadas do "produto 1", a data e o valor

Scenario: Ver histórico de estoque de um produto da loja
    Given “Samuel” está definido na base de dados como “Vendedor”
    And “Samuel” está na “Página de Gerenciamento de Vendas”
    When eu seleciono “informação sobre produtos” 
    And eu seleciono produto “produto 1”
    Then eu sou direcionado para a página “informações”
    And eu seleciono “visualizar histórico de estoque do produto 1” no último "mês"
    Then o sistema mostra o estoque do "produto 1" em cada dia do "mês"
