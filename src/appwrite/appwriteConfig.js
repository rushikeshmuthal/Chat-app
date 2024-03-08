import { Client, Databases, ID, Query ,Account} from 'appwrite';
import config from "../config"


const client = new Client();
export default client
    .setEndpoint(config.appwriteUrl)
    .setProject("65df416dba3a61f58e6b")


export const account = new Account(client);

export const getMessages = async () => {
    return await databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId,
        [Query.orderDesc('$createdAt')])
    
}
export const createDocument = async (paylod) => {
    return await databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        paylod
    );
}
export const deleteDocument  = async (msg_id)=> {
     await databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, msg_id);
}

const databases = new Databases(client);

