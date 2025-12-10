import React, { useState } from "react";
import OrgModal from "./OrgModal";
import { createOrg as apiCreateOrg } from "../api/dashboard";

export default function OrgCreate() {
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
    <>
      <button onClick={openCreate}>+ new</button>
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
    </>
  );
}
