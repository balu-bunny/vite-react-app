import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export async function getDashboardData() {
  return await client.models.org.list();
}

export async function getStats() {
  const orgs = await client.models.org.list();
  return { count: orgs.data?.length || 0 };
}

export async function refreshDashboard() {
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
    const credentials = JSON.stringify({
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
