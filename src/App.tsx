import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { subscribeToOrgs, createOrg as apiCreateOrg } from "./api/dashboard";

function App() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);

  useEffect(() => {
    subscribeToOrgs(setOrgs);
  }, []);

  function createOrg() {
    apiCreateOrg(window.prompt("Org content"));
  }

  return (
    <main>
      <h1>My orgs</h1>
      <button onClick={createOrg}>+ new</button>
      <ul>
        {orgs.map((org) => (
          <li key={org.id}>{org.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new org.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
