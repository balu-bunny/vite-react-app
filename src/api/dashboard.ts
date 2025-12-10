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
