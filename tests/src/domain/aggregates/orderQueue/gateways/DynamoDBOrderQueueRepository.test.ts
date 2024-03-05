// src/__tests__/DynamoDBOrderQueueRepository.test.ts
import DynamoDBOrderQueueRepository from "../../../../../../src/domain/aggregates/orderQueue/gateways/DynamoDBOrderQueueRepository"; // Adjust the path based on your project structure
import OrderQueue from "../../../../../../src/domain/aggregates/orderQueue/core/entities/OrderQueue";

jest.mock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocument: {
    from: jest.fn(() => ({
      scan: jest.fn().mockResolvedValue({
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
      update: jest.fn().mockResolvedValue({
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

describe("DynamoDBOrderQueueRepository", () => {
  let repository: DynamoDBOrderQueueRepository;

  beforeEach(() => {
    repository = new DynamoDBOrderQueueRepository();
  });

  describe("getOrderQueue", () => {
    it("should return OrderQueue array", async () => {
      const result = await repository.getOrderQueue();

      expect(result).toEqual([
        new OrderQueue(123, "status", "2024-01-29", "00:05:00", "12345"),
      ]);
    });
  });

  describe("getOrderQueueStatus", () => {
    it("should return OrderQueue", async () => {
      const result = await repository.getOrderQueueStatus(123);

      expect(result).toEqual([
        new OrderQueue(123, "status", "2024-01-29", "00:05:00", "12345"),
      ]);
    });
  });

  describe("updateOrderQueue", () => {
    it("should update OrderQueue", async () => {
      const result = await repository.updateOrderQueue("123", 1, 3);

      expect(result).toEqual([
        new OrderQueue(123, "status", "2024-01-29", "00:05:00", "12345"),
      ]);
    });
  });

    describe("add", () => {
        it("should add OrderQueue", async () => {
        const result = await repository.add(123);

        expect(result).toEqual({"Items": [{"id": "12345", "orderDate": "2024-01-29", "order_id": 123, "status_queue": "status", "waiting_time": "00:05:00"}]});
        });
    });

});
