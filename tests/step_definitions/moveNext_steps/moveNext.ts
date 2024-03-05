import { Given, Then } from "@cucumber/cucumber";
import * as sinon from "sinon";
import assert from "assert";
import IOrderQueueGateway from "../../../src/domain/aggregates/orderQueue/core/ports/IOrderQueueGateway";
import { MoveNextUseCase } from "../../../src/domain/aggregates/orderQueue/usecases/moveNext/MoveNext";
import IQueueService from "../../../src/application/ports/IQueueService";

Given(
	"Inicio o moveNext passando o id {int}",
	async function (this: any, id: number) {
		const MoveNextGatewayMock: IOrderQueueGateway = {
			getOrderQueue: sinon.stub().resolves([]),
			getOrderQueueStatus: sinon.stub().resolves([]),
			updateOrderQueue: sinon.stub(),
			add: sinon.stub(),
			beginTransaction: sinon.stub(),
			commit: sinon.stub(),
			rollback: sinon.stub(),
		};

		const queueServiceMock: IQueueService = {
			sendMessage: sinon.stub(),
			receiveMessage: sinon.stub(),
			messageID: sinon.stub()
		}

		const setupGatewayMock = (orderId: number) => {
			let mockGetOrderQueue;
			let mockGetOrderQueueStatus;

			if (orderId === 1) {
				mockGetOrderQueue = {
					id: "102030",
					order_id: orderId,
					status_queue: "Em preparação",
				};

				mockGetOrderQueueStatus = {
					id: "102030",
					order_id: orderId,
					status_queue: "Aprovado",
				};
			}

			if (orderId === 2) {
				mockGetOrderQueue = {
					id: "102030",
					order_id: orderId,
					status_queue: "Finalizado",
				};

				mockGetOrderQueueStatus = {
					id: "102030",
					order_id: orderId,
					status_queue: "Finalizado",
				};
			}

			MoveNextGatewayMock.getOrderQueue = sinon
				.stub()
				.resolves([mockGetOrderQueue]);
			MoveNextGatewayMock.getOrderQueueStatus = sinon
				.stub()
				.resolves([mockGetOrderQueueStatus]);
		};

		if (id === 1 || id === 2) {
			setupGatewayMock(id);
		}

		if (id === 4){
			MoveNextGatewayMock.getOrderQueueStatus = sinon
				.stub()
				.rejects('Failed to get order queue information')
		}

		this.result = await MoveNextUseCase.execute(
			{ id: id },
			MoveNextGatewayMock,
			queueServiceMock
		);
	}
);

Then("Deve me retornar status {string}", function (this: any, status: string) {
	assert.equal(this.result.result[0].status, status);
});

Then("message {string}", function (this: any, s: string) {
	assert.equal(this.result.message, s);
});

Then("Deve retornar status {int}", function (this: any, int: number) {
	assert.equal(this.result.httpCode, int);
});

Then("Deve retornar error", function (this: any) {
	assert.equal(this.result.hasError, true);
});
