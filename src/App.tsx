import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);

  useEffect(() => {
    client.models.org.observeQuery().subscribe({
      next: (data) => setOrgs([...data.items]),
    });
  }, []);

  function createOrg() {
    client.models.org.create({ content: window.prompt("Org content") });
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
