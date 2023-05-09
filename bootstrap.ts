import {dbConnect} from "./dbConfig";
import cors from '@fastify/cors';

const dotenv = require("dotenv");
dotenv.config();

const fastify = require('fastify');
const app = fastify();
const port = process.env['PORT'];
const dbUrl = process.env['DATABASE_URL'];
const socket = require('socket.io')
export const io = socket(app.server);
const createConversation = require('./src/conversation/port/createConversation').createConversation;
const updateConversation = require('./src/conversation/port/updateConversation').updateConversation;
const deleteConversation = require('./src/conversation/port/deleteConversation').deleteConversation;
const getConversation = require('./src/conversation/port/getConversation').getConversation;
const getConversations = require('./src/conversation/port/getConversations').getConversations;
const addUserToConversation = require('./src/conversation/port/addUserToConversation').addUserToConversation;
const getJoinedConversation = require('./src/conversation/port/getJoinedConversations').getJoinedConversations;
const leaveOrKickUser = require('./src/conversation/port/leaveOrKickUser').addUserToConversation;

const createMessage = require('./src/message/port/createMessage').createMessage;
const deleteMessage = require('./src/message/port/deleteMessage').deleteMessage;
const getConversationMessages = require('./src/message/port/getConversationMessages').getConversationMessages;
const updateMessage = require('./src/message/port/updateMessage').updateMessage;

async function startServer() {
    await app.listen({ port, host: '0.0.0.0' }, (err: any) => {
        if (err) {
            console.log('error happened: ' + err)
            process.exit(1);
        } else {
            console.log(`========( Server is up at port ${port})========`);
        }
    });
}

async function main() {
    await app.register(cors)
    await app.register(require('@fastify/express'));

    app.register(createConversation, {prefix: "/conversation"});
    // app.register(getConversation, {prefix: "/conversation"});
    app.register(getConversations, {prefix: "/conversation"});
    app.register(updateConversation, {prefix: "/conversation"});
    app.register(getJoinedConversation, {prefix: "/conversation"});
    app.register(addUserToConversation, {prefix: "/conversation"});
    app.register(deleteConversation, {prefix: "/conversation"});
    app.register(leaveOrKickUser, {prefix: "/conversation"});

    app.register(createMessage, {prefix: "/message"});
    app.register(deleteMessage, {prefix: "/message"});
    app.register(getConversationMessages, {prefix: "/message"});
    app.register(updateMessage, {prefix: "/message"});

    await dbConnect(dbUrl);
    await startServer()
}


main()