export interface NewOrderQueueInputDTO {
    order_id: number;
}

export interface NewOrderQueueOutputDTO {
    hasError: boolean;
    message?: string;
    httpCode?: number;
    result?: orderqueueInfo[];
}

export type orderqueueInfo = {
    id: number;
    status: string;
    waiting_time: string;
  };