import { Account, Client, Databases } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('666de8540012b039e4ff');

export const account = new Account(client);
export const database = new Databases(client);
export {ID} from 'appwrite'