import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export async function getOrgs() {
  return await client.models.org.list();
}


export function subscribeToOrgs(
  callback: (orgs: Array<Schema["org"]["type"]>) => void
) {
  return client.models.org.observeQuery().subscribe({
    next: (data: any) => callback([...data.items]),
  });
}

export async function createOrg(
  name: string,
  type: string,
  email: string,
  icon: string,
  color: string,
  storage: string,
  encryptionKey: string,
  clientId?: string | null,
  clientSecret?: string | null
) {
  if (name) {
    const credentials = ({
      clientId: clientId || "",
      clientSecret: clientSecret || "",
    });
    return await client.models.org.create({
      name,
      type,
      email,
      icon,
      color,
      storage,
      encryptionKey,
      credentials,
    });
  }
}

export async function updateOrg(
  id: string,
  updates: Partial<{
    name: string;
    type: string;
    email: string;
    icon: string;
    color: string;
    storage: string;
    encryptionKey: string;
    clientId?: string | null;
    clientSecret?: string | null;
  }>
) {
  if (!id) throw new Error("id is required to update an org");

  const payload: any = { id };

  // Copy known fields
  const fields = [
    "name",
    "type",
    "email",
    "icon",
    "color",
    "storage",
    "encryptionKey",
  ];
  for (const f of fields) {
    if ((updates as any)[f] !== undefined) payload[f] = (updates as any)[f];
  }

  // If credentials parts provided, serialize into the credentials JSON field
  if (
    updates.clientId !== undefined ||
    updates.clientSecret !== undefined
  ) {
    payload.credentials = ({
      clientId: updates.clientId || "",
      clientSecret: updates.clientSecret || "",
    });
  }

  return await client.models.org.update(payload);
}

export async function deleteOrg(id: string) {
  if (!id) throw new Error("id is required to delete an org");
  return await client.models.org.delete({ id });
}
