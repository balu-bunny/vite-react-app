import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export async function getOrgs() {
  return await client.models.org.list();
}


export async function createOrg(
  name: string,
  type: string,
  email: string,
  icon: string,
  color: string,
  storage: string,
  encryptionKey: string
) {
  if (name) {
    return await client.models.org.create({
      name,
      type,
      email,
      icon,
      color,
      storage,
      encryptionKey,
    });
  }
}
