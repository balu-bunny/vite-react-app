import React, { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { subscribeToOrgs, createOrg as apiCreateOrg } from "./api/dashboard";
import OrgModal from "./components/OrgModal";

function App() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const sub = subscribeToOrgs(setOrgs);
    return () => sub?.unsubscribe?.();
  }, []);

  function openCreate() {
    setNewContent("");
    setClientId("");
    setClientSecret("");
    setShowModal(true);
  }

  async function handleCreate() {
    await apiCreateOrg(newContent || null);
    setShowModal(false);
  }

  return (
    <main>
      <h1>My orgs</h1>
      <button onClick={openCreate}>+ new</button>
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

      <OrgModal
        open={showModal}
        value={newContent}
        onChange={setNewContent}
        clientId={clientId}
        onClientIdChange={setClientId}
        clientSecret={clientSecret}
        onClientSecretChange={setClientSecret}
        onCancel={() => setShowModal(false)}
        onCreate={handleCreate}
      />
    </main>
  );
}

export default App;
