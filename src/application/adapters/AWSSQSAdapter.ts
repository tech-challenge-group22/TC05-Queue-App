import IQueueService from "../ports/IQueueService";
import { OrderQueueController } from "../../domain/aggregates/orderQueue/controllers/OrderQueueController";
import { NewOrderQueueOutputDTO } from "../../domain/aggregates/orderQueue/usecases/newOrderQueue/NewOrderQueueDTO";
import * as dotenv from 'dotenv';
import { SQS } from 'aws-sdk';
import cron from 'node-cron';


export default class AWSSQSAdapter implements IQueueService {
    private sqs = new SQS();
    private AWS = require('aws-sdk');
    private cron = undefined;
    private static _instance: AWSSQSAdapter;
        
    private constructor () {
        dotenv.config();

        this.AWS.config.update({ region: process.env.AWS_REGION });

        const polling_interval = Number(process.env.MSG_POLLING_INTERVAL);

        //exemple: 
        // cron.schedule('*/5 * * * * *', .....)
        cron.schedule('*/' + polling_interval.toString() + ' * * * * *', () => {            
            this.receiveMessage();
        });
    }

    static getInstance(): AWSSQSAdapter {
        if ( !this._instance ) {
            this._instance = new AWSSQSAdapter();
        }
        return this._instance;
    }

    async sendMessage (message: any) {
        console.log('Sending message: ' + JSON.stringify(message));

        const params: SQS.Types.SendMessageRequest = {
          QueueUrl: `${process.env.AWS_OUTPUT_QUEUE_URL}`,
          MessageBody: JSON.stringify(message),        
          MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
          MessageDeduplicationId: `${this.messageID().toString()}`,
        };
      
        try {
          const data = await this.sqs.sendMessage(params).promise();
            console.log('Message sent:', data.MessageId);
        } catch (error) {
            console.error('Error sending message:', error);
        }
      }

    async receiveMessage () {
        try {
            const receiveParams: SQS.Types.ReceiveMessageRequest = {
            QueueUrl: `${process.env.AWS_INPUT_QUEUE_URL}`,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 5,
            };
    
            const data = await this.sqs.receiveMessage(receiveParams).promise();
    
            if (data.Messages && data.Messages.length > 0) {

                console.log('Quantidade mensagens recebidas: ' + data.Messages.length);
                for (let i: number = 0; i < data.Messages.length; i++){               
                    const message = data.Messages[i];

                    console.log('Received message:', message.Body);
                    console.log('Message Id: '+ message.MessageId);

                    // Process the message
                    const msgBody =  JSON.parse(String(message.Body));
                    console.log('Order Id: ' + msgBody.order_id);

                    const output: NewOrderQueueOutputDTO = 
                        await OrderQueueController.newOrderQueue (Number(msgBody.order_id));

                    console.log('Deleting message Id: ' + message.MessageId);
                    await this.sqs
                        .deleteMessage({
                            QueueUrl: `${process.env.AWS_INPUT_QUEUE_URL}`,
                            ReceiptHandle: message.ReceiptHandle!,
                        }).promise();
                }
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    }

    // Implement timestamp logical here
    messageID(): number {
        return Date.now();
    }
}



