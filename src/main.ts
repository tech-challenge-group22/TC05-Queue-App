import ExpressAdapter from './application/adapters/ExpressAdapter';
import * as dotenv from 'dotenv';
import OrderQueueRoute from './infrastructure/api/orderqueue.route';
import AWSSQSAdapter from './application/adapters/AWSSQSAdapter';

dotenv.config();

const server = new ExpressAdapter();
const orderQueueRoute = new OrderQueueRoute(server);

server.router(OrderQueueRoute);
server.listen(3000);

console.log ('Starting listening to messages...');
const queueService = AWSSQSAdapter.getInstance();
