import React, { useState } from "react";

interface Item {
  id: string;
  content: string;
}

const Dnd: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", content: "Div 1" },
    { id: "2", content: "Div 2" },
    { id: "3", content: "Div 3" },
    { id: "4", content: "Div 4" },
  ]);

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    event.preventDefault(); // Necesario para permitir el drop
    if (id === draggedItemId) return; // No interactuar consigo mismo

    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const targetIndex = items.findIndex((item) => item.id === id);

    // Reordenar el estado
    const updatedItems = [...items];
    const [removed] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, removed);
    setItems(updatedItems);
  };

  const handleDrop = () => {
    setDraggedItemId(null); // Limpiar el estado de arrastre
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold mb-4">Reorganizar Divs</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable // Hacer que el elemento sea arrastrable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDrop={handleDrop}
            className="p-4 bg-white border rounded shadow cursor-move text-black"
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dnd;
