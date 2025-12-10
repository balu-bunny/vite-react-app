import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { subscribeToOrgs, createOrg as apiCreateOrg } from "./api/dashboard";

function Modal({
  open,
  value,
  onChange,
  onCancel,
  onCreate,
}: {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onCreate: () => void;
}) {
  if (!open) return null;
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Create Org</h3>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Org content"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
  background: "white",
  padding: 16,
  borderRadius: 8,
  width: 320,
  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
};

function App() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const sub = subscribeToOrgs(setOrgs);
    return () => sub?.unsubscribe?.();
  }, []);

  function openCreate() {
    setNewContent("");
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

      <Modal
        open={showModal}
        value={newContent}
        onChange={setNewContent}
        onCancel={() => setShowModal(false)}
        onCreate={handleCreate}
      />
    </main>
  );
}

export default App;
