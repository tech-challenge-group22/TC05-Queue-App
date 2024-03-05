@orderQueue
Feature: Listar Fila De Pedidos

  @listarSemIdScenario
  Scenario: Listar fila de pedidos sem ID
    Given inicio a listagem de queue sem passar o id
    Then o resultado deve ser de sucesso
    And deve retornar 2 item

  @listarComIdValidoScenario
  Scenario: Listar fila de pedidos passando um ID existente
    Given inicio a listagem de queue passando o id 1 como parametro
    Then o resultado deve ser de sucesso
    And deve retornar 1 item

  @listarComIdInvalidoScenario
  Scenario: Listar fila de pedidos passando um ID inexistente
    Given inicio a listagem de queue passando o id 3 como parametro
    Then o resultado deve retornar erro
    And deve retornar a mensagem de erro 'Order not found. Please, certity that it is a valid Order Number!'

  @listarSimulandoErroScenario
  Scenario: Listar fila de pedidos simulando um erro
    Given inicio a listagem de queue e existe erro na conexão
    Then o resultado deve retornar erro