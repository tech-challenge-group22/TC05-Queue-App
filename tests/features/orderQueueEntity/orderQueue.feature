Feature: Criar uma nova instância de OrderQueue

  Scenario: Criar uma nova instância de OrderQueue
    Given que um pedido válido é criado
    When uma nova instância de OrderQueue é criada
    Then os atributos da instância devem ser definidos corretamente
