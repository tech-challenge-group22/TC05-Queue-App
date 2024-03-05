import { GetOrderQueueUseCase } from '../usecases/getOrderQueue/GetOrderQueue';
import { GetOrderQueueInputDTO } from '../usecases/getOrderQueue/GetOrderQueueDTO';
import { MoveNextInputDTO } from '../usecases/moveNext/MoveNextDTO';
import { MoveNextUseCase } from '../usecases/moveNext/MoveNext';
import { NewOrderQueueInputDTO } from '../usecases/newOrderQueue/NewOrderQueueDTO';
import { NewOrderQueueUseCase } from '../usecases/newOrderQueue/NewOrderQueue';
import DynamoDBOrderQueueRepository from '../gateways/DynamoDBOrderQueueRepository';
import AWSSQSAdapter from '../../../../application/adapters/AWSSQSAdapter';

export class OrderQueueController {
  static async getOrderQueue(orderId?: number): Promise<any> {
    const orderQueueGateway = new DynamoDBOrderQueueRepository();
    const input: GetOrderQueueInputDTO = {
      id: orderId,
    };
    return await GetOrderQueueUseCase.execute(input, orderQueueGateway);
  }

  static async moveNext(orderId: number): Promise<any> {
    const orderQueueGateway = new DynamoDBOrderQueueRepository();
    const queuService = AWSSQSAdapter.getInstance();
    const input: MoveNextInputDTO = {
      id: orderId,
    };
    return await MoveNextUseCase.execute(input, orderQueueGateway, queuService);
  }

  static async newOrderQueue(orderId: number): Promise<any> {
    const orderQueueGateway = new DynamoDBOrderQueueRepository();
    const input: NewOrderQueueInputDTO = {
      order_id: orderId,
    };
    return await NewOrderQueueUseCase.execute(input, orderQueueGateway);
  }
}
