import React from "react";

export default function OrgModal({
  open,
  name,
  onNameChange,
  type,
  onTypeChange,
  email,
  onEmailChange,
  icon,
  onIconChange,
  color,
  onColorChange,
  storage,
  onStorageChange,
  encryptionKey,
  onEncryptionKeyChange,
  clientId,
  onClientIdChange,
  clientSecret,
  onClientSecretChange,
  onCancel,
  onCreate,
}: {
  open: boolean;
  name: string;
  onNameChange: (v: string) => void;
  type: string;
  onTypeChange: (v: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  icon: string;
  onIconChange: (v: string) => void;
  color: string;
  onColorChange: (v: string) => void;
  storage: string;
  onStorageChange: (v: string) => void;
  encryptionKey: string;
  onEncryptionKeyChange: (v: string) => void;
  clientId: string;
  onClientIdChange: (v: string) => void;
  clientSecret: string;
  onClientSecretChange: (v: string) => void;
  onCancel: () => void;
  onCreate: () => void;
}) {
  if (!open) return null;

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

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Create Org</h3>
        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Organization Name"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          placeholder="Organization Type"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="Email"
          type="email"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={icon}
          onChange={(e) => onIconChange(e.target.value)}
          placeholder="Icon (emoji)"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          placeholder="Color (CSS classes)"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={storage}
          onChange={(e) => onStorageChange(e.target.value)}
          placeholder="Storage Type"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={encryptionKey}
          onChange={(e) => onEncryptionKeyChange(e.target.value)}
          placeholder="Encryption Key"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={clientId}
          onChange={(e) => onClientIdChange(e.target.value)}
          placeholder="Client ID"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          value={clientSecret}
          onChange={(e) => onClientSecretChange(e.target.value)}
          placeholder="Client Secret"
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
