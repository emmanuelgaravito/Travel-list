import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onReset,
}) {
  const [sortBy, setSortBy] = useState("input");

  const sortingFunctions = {
    input: (a, b) => a.id - b.id,
    description: (a, b) => a.description.localeCompare(b.description),
    packed: (a, b) => Number(a.packed) - Number(b.packed),
  };

  const sortedItems = [...items].sort(sortingFunctions[sortBy]);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          name=""
          id=""
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onReset()}>Clear list</button>
      </div>
    </div>
  );
}
