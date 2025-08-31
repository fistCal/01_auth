import { Client, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68b29ed1001ca652196b')

export const account = new Account(client);

export default client;