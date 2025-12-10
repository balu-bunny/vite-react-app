import React, { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { subscribeToOrgs } from "../api/dashboard";

export default function OrgList() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);

  useEffect(() => {
    const sub = subscribeToOrgs(setOrgs);
    return () => sub?.unsubscribe?.();
  }, []);

  return (
    <ul>
      {orgs.map((org) => (
        <li key={org.id}>{org.icon} {org.name}</li>
      ))}
    </ul>
  );
}
