export default interface IQueueService {
    sendMessage (message: any): any;
    receiveMessage(): any;
    messageID(): number;
}