import { Given, When, Then } from '@cucumber/cucumber'
import OrderQueue from '../../../src/domain/aggregates/orderQueue/core/entities/OrderQueue';
import assert from 'assert';

let orderQueue: OrderQueue;

Given('que um pedido válido é criado', function (this: any) {
});

When('uma nova instância de OrderQueue é criada', function () {
    orderQueue = new OrderQueue(
        1,
        'Aprovado',
        '22/01/2024',
        '00:05:00',
    );
});

Then('os atributos da instância devem ser definidos corretamente', function () {
    assert.equal(typeof orderQueue.id, 'string');
    assert.equal(typeof orderQueue.order_id, 'number');
});
