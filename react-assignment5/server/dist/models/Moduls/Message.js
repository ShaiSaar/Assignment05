"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(senderID, senderName, content) {
        this.getId = () => {
            return this.id;
        };
        this.getDate = () => {
            return this.date;
        };
        this.getSenderID = () => {
            return this.senderID;
        };
        this.setSenderID = (senderID) => {
            this.senderID = senderID;
        };
        this.getSenderName = () => {
            return this.senderID;
        };
        this.setSenderName = (senderName) => {
            this.senderName = senderName;
        };
        this.getContent = () => {
            return this.content;
        };
        this.setContent = (content) => {
            this.content = content;
        };
        let today = new Date();
        this.id = Math.abs(today.getTime());
        this.senderID = senderID;
        this.senderName = senderName;
        this.date = today.toLocaleDateString() + " " + today.toLocaleTimeString();
        this.content = content;
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map