export class Message {
    constructor(
        public objectId: string,
        public text: string,
        public conversationId : string,
        public userId: string,
        public senderName: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {
    }
}