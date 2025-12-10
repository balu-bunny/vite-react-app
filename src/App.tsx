import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { subscribeToOrgs, createOrg as apiCreateOrg } from "./api/dashboard";
import OrgModal from "./components/OrgModal";

function App() {
  const [orgs, setOrgs] = useState<Array<Schema["org"]["type"]>>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const sub = subscribeToOrgs(setOrgs);
    return () => sub?.unsubscribe?.();
  }, []);

  function openCreate() {
    setName("");
    setType("");
    setEmail("");
    setIcon("");
    setColor("");
    setStorage("");
    setEncryptionKey("");
    setClientId("");
    setClientSecret("");
    setShowModal(true);
  }

  async function handleCreate() {
    await apiCreateOrg(
      name,
      type,
      email,
      icon,
      color,
      storage,
      encryptionKey,
      clientId,
      clientSecret
    );
    setShowModal(false);
  }

  return (
    <main>
      <h1>My orgs</h1>
      <button onClick={openCreate}>+ new</button>
      <ul>
        {orgs.map((org) => (
          <li key={org.id}>{org.icon} {org.name}</li>
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
        name={name}
        onNameChange={setName}
        type={type}
        onTypeChange={setType}
        email={email}
        onEmailChange={setEmail}
        icon={icon}
        onIconChange={setIcon}
        color={color}
        onColorChange={setColor}
        storage={storage}
        onStorageChange={setStorage}
        encryptionKey={encryptionKey}
        onEncryptionKeyChange={setEncryptionKey}
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
