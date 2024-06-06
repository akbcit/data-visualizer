import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
import { PublicSectorCompanySchema } from "../schema/PublicSectorCompany.schema.db";

dotenv.config();

const DATASTAX_URI = process.env.DATASTAX_URI!;
const DATASTAX_CLIENT_TOKEN = process.env.DATASTAX_CLIENT_TOKEN!;

export const connectCassandraDB = async () => {
  // Initialize the client
  const client = new DataAPIClient(DATASTAX_CLIENT_TOKEN!);
  const db = client.db(DATASTAX_URI);
  try {

    const colls = await db.listCollections();
    console.log('Connected to AstraDB:', colls);

    // Check if the collection exists
    const collectionExists = colls.find(coll => coll.name === 'public_sector_companies');

    if (!collectionExists) {
      // Create the collection if it doesn't exist
      const publicSectorCompanyCollection = await db.createCollection<PublicSectorCompanySchema>('public_sector_companies', {
        checkExists: false,
      });
      console.log(`* Created collection ${publicSectorCompanyCollection.namespace}.${publicSectorCompanyCollection.collectionName}`);
    } else {
      console.log('Collection already exists');
    }
  }
  catch (err) {
    console.log(`Unable to connect to AstraDB:${err}`);
  }
}