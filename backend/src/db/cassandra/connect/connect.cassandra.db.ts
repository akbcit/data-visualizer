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
  }
  catch (err) {
    console.log(`Unable to connect to AstraDB:${err}`);
  }
}