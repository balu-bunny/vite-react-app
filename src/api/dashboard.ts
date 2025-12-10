import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export async function getDashboardData() {
  return await client.queries.getDashboard({});
}

export async function getStats() {
  return await client.queries.getStats({});
}

export async function refreshDashboard() {
  return await client.mutations.refreshDashboard({});
}
