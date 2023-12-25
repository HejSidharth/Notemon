import { Client, Databases, Account } from "appwrite";


const projectKey = import.meta.env.VITE_APPBASE;
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectKey); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
