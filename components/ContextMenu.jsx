"use client";

export default function ContextMenu({ x, y, items, onClose }) {
  return (
    <>
      {/* backdrop transparan buat nutup menu kalau klik di luar */}
      <div
        className="context-backdrop"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <div className="context-menu" style={{ left: x, top: y }}>
        {items.map((item) => (
          <div
            key={item.label}
            className="context-item"
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
}
