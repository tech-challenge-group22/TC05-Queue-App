import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import assert from 'assert';
import ExpressAdapter from '../../../src/application/adapters/ExpressAdapter';
import OrderQueueRoute from "../../../src/infrastructure/api/orderqueue.route"

let adapter: ExpressAdapter;
let response: request.Response;
let orderQueueRoute: OrderQueueRoute;

Given('I have registered the OrderQueue routes', function () {
  adapter = new ExpressAdapter();
  orderQueueRoute = new OrderQueueRoute(adapter); // This will register the routes
});

When('I make a GET request to {string} with order_id {string}', async function (path: string, orderId: string) {
  response = await request(adapter.getServer()).get(`${path}?order_id=${orderId}`);
});

When('I make a PATCH request to {string} with id {string}', async function (path: string, id: string) {
  response = await request(adapter.getServer()).patch(`${path}?id=${id}`);
});

Then('I should receive a successful response', function () {
  assert.strictEqual(response.status, 200);
  // You can add more assertions here based on the expected response body
});
