import { v4 as uuidv4 } from 'uuid';

export default class OrderQueue {
  id: string;
  order_id: number;
  status_queue: string;
  orderDate?: string;
  waiting_time?: string;

  constructor(
    order_id: number,
    status?: string,
    orderDate?: string,
    waiting_time?: string,
    id?: string,
  ) {
    this.id = id ?? uuidv4();
    this.order_id = order_id;
    this.status_queue = status ?? statusName[1];
    this.orderDate = orderDate ?? new Date().toISOString();
    this.waiting_time = waiting_time ?? '00:05:00';
  }
}

export const statusName: { [key: number]: string } = {
  1: 'Recebido',
  2: 'Em preparação',
  3: 'Pronto',
  4: 'Finalizado',
};

export const statusCode: { [key: string]: number } = {
  Recebido: 1,
  'Em preparação': 2,
  Pronto: 3,
  Finalizado: 4,
};

export enum OrderWaitingTime {
  TempoRecebido = 5,
  TempoEmPreparacao = 4,
  TempoPronto = 0,
}
