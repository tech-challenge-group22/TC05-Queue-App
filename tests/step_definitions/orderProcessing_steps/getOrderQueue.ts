import { Given, Then } from "@cucumber/cucumber";
import * as sinon from "sinon";
import assert from "assert";
import { GetOrderQueueUseCase } from "../../../src/domain/aggregates/orderQueue/usecases/getOrderQueue/GetOrderQueue";

const queue1 = {
	id: "123456",
	order_id: 1,
	status_queue: "concluido",
	waiting_time: '00:00:00',
	orderDate: "11/07/2023",
};
const queue2 = {
	id: "123457",
	order_id: 2,
	status_queue: "concluido",
	waiting_time: '00:00:00',
	orderDate: "12/07/2023",
};

let QueueGatewayMock = {
	getOrderQueue: sinon.stub(),
	getOrderQueueStatus: sinon.stub(),
	updateOrderQueue: sinon.stub(),
	add: sinon.stub(),
	beginTransaction: sinon.stub(),
	commit: sinon.stub(),
	rollback: sinon.stub(),
};
Given("inicio a listagem de queue sem passar o id", async function (this: any) {
	QueueGatewayMock = {
		...QueueGatewayMock,
		getOrderQueue: sinon.stub().resolves([queue1, queue2]),
	};

	this.result = await GetOrderQueueUseCase.execute({}, QueueGatewayMock);
});

Then("o resultado deve ser de sucesso", async function (this: any) {
	assert.deepStrictEqual(this.result.hasError, false);
});

Given(
	"inicio a listagem de queue passando o id {int} como parametro",
	async function (this: any, int: number) {
		if (int === 1) {
			QueueGatewayMock = {
				...QueueGatewayMock,
				getOrderQueue: sinon.stub().resolves([queue1]),
			};
		}

		if (int === 3) {
			QueueGatewayMock = {
				...QueueGatewayMock,
				getOrderQueue: sinon.stub().resolves([]),
			};
		}
		this.result = await GetOrderQueueUseCase.execute(
			{ id: int },
			QueueGatewayMock
		);
	}
);

Given(
	"inicio a listagem de queue e existe erro na conexão",
	async function (this: any) {
		QueueGatewayMock = {
			...QueueGatewayMock,
			getOrderQueue: sinon.stub().throws(new Error("Simulando erro")),
		};

		this.result = await GetOrderQueueUseCase.execute({}, QueueGatewayMock);
	}
);

Then("o resultado deve retornar erro", async function (this: any) {
	assert.deepStrictEqual(this.result.hasError, true);
});

Then("deve retornar {int} item", async function (this: any, int: number) {
	assert.equal(this.result.result?.length, int);
});

Then(
	"deve retornar a mensagem de erro {string}",
	async function (this: any, s: string) {
		assert.equal(this.result.message, s);
	}
);
