import { OrderQueueController } from "../../../../../../src/domain/aggregates/orderQueue/controllers/OrderQueueController";
import { GetOrderQueueUseCase } from "../../../../../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue";
import { MoveNextUseCase } from "../../../../../../src/domain/aggregates/orderQueue/usecases/moveNext/MoveNext";
import { NewOrderQueueUseCase } from "../../../../../../src/domain/aggregates/orderQueue/usecases/newOrderQueue/NewOrderQueue";

jest.mock(
  "../../../../../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue"
);

jest.mock(
  "../../../../../../src/domain/aggregates/orderQueue/usecases/newOrderQueue/NewOrderQueue"
);

jest.mock("@aws-sdk/lib-dynamodb", () => ({
    DynamoDBDocument: {
      from: jest.fn(() => ({
        put: jest.fn().mockResolvedValue({
          Items: [
            {
              order_id: 123,
              status_queue: "status",
              orderDate: "2024-01-29",
              waiting_time: "00:05:00",
              id: "12345",
            },
          ],
        }),
      })),
    },
  }));

describe("getOrderQueue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call GetOrderQueueUseCase", async () => {
    const orderId = 123;
    await OrderQueueController.getOrderQueue(orderId);

    expect(GetOrderQueueUseCase.execute).toHaveBeenCalledWith(
      { id: orderId }, expect.anything()
    );
  });

  it("should call newOrderQueue", async () => {
    const orderId = 123;
    await OrderQueueController.newOrderQueue(orderId);

    expect(NewOrderQueueUseCase.execute).toHaveBeenCalledWith({ order_id: orderId }, expect.anything());
  });

});
