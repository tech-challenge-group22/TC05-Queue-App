import IOrderQueueGateway from '../../../../../../../src/domain/aggregates/orderQueue/core/ports/IOrderQueueGateway';
import { NewOrderQueueUseCase } from '../../../../../../../src/domain/aggregates/orderQueue/usecases/newOrderQueue/NewOrderQueue';
import { NewOrderQueueInputDTO, orderqueueInfo } from '../../../../../../../src/domain/aggregates/orderQueue/usecases/newOrderQueue/NewOrderQueueDTO';

const orderQueueUpdateMock: orderqueueInfo = {
  id: 100,
  status: "Recebido",
  waiting_time: "5",
}

const orderQueueGatewayMock: IOrderQueueGateway = {
  getOrderQueue: jest.fn().mockResolvedValue(100),
  getOrderQueueStatus: jest.fn().mockResolvedValue(100),
  updateOrderQueue: jest.fn().mockResolvedValue(orderQueueUpdateMock),
  add: jest.fn().mockResolvedValue(100),
  beginTransaction: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(), 
};

describe('NewOrderQueueUseCase', () => {
  it ('New Order Queue successfully added', async () => {
    const result = await NewOrderQueueUseCase.execute({ order_id: 100,}, orderQueueGatewayMock);

    expect(result.hasError).toBe(false);
  });

  it('New Order Queue adding processes failed', async () => {
    const orderQueueGatewayErrorMock: IOrderQueueGateway = {
      ...orderQueueGatewayMock,
      add: jest.fn(() => {
        throw new Error('Erro mockado');
      }),
    };

    const result = await NewOrderQueueUseCase.execute( {order_id: Number()}, orderQueueGatewayErrorMock );

    expect(result.hasError).toBe(true);
    expect(result.httpCode).toBe(500);
    expect(result.message).toBe('Failed to add a new order into the queue');
  });
});
