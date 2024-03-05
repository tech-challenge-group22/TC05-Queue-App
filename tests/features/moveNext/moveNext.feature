@moveNext
Feature: Atualizar pedido na fila

    @atualizarPedido
    Scenario: Atualiza status do pedido passando o ID
        Given Inicio o moveNext passando o id 1
        Then Deve me retornar status 'Em preparação'

    @tentarAtualizarPedidoFinalizado
    Scenario: Tenta atualizar pedido já finalizado
        Given Inicio o moveNext passando o id 2
        Then Deve retornar error
        And message 'WARNING: Order has already delivered!'

    @buscarPedidoInexistente
    Scenario: Não encontra pedidos
        Given Inicio o moveNext passando o id 3
        Then Deve retornar status 404
        And message 'Order not found in the queue. Please, certify that it is a valid Order Number.'

    @erroConexãoBancoDeDados
    Scenario: Erro ao buscar pedidos
        Given Inicio o moveNext passando o id 4
        Then Deve retornar error
        And message 'Failed to get order queue information'