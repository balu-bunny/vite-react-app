import React from "react";

export default function OrgModal({
  open,
  value,
  onChange,
  clientId,
  onClientIdChange,
  clientSecret,
  onClientSecretChange,
  onCancel,
  onCreate,
}: {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Org content"
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
