import "./app.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddItemForm from "./AddItemForm";

export default function App() {

  const [add, set] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(add));
  }, [add]);

  
  function addItem(title) {
    set((currentadd) => {
      return [
        ...currentadd,
        {
          id: nanoid(),
          title: title,
          completed: false,
        },
      ];
    });
  }

  function toggleadd(id, completed) {
    set((currentadd) => {
      return currentadd.map((add) => {
        if (add.id === id) {
          return { ...add, completed: completed };
        }
        return add;
      });
    });
  }

  function deleteadd(id) {
    const element = document.querySelector(`.button-${id}`).parentNode;
  element.style.animation = "fadeOut 500ms forwards";

  setTimeout(() => {
    set((currentadd) => {
      return currentadd.filter((add) => add.id !== id);
    });
  }, 150);
  }

  // Sort the todos based on completion status
  const sortedTodos = add.slice().sort((a, b) => b.completed - a.completed);

  return (
    <>
      <AddItemForm onSubmit={addItem} />
      <ul className="list">
        {sortedTodos.map((add) => {
          return (
            <li key={add.id}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={add.completed}
                  onChange={(e) => toggleadd(add.id, e.target.checked)}
                />
                <span>{add.title}</span>
              </label>
              <button className={`button button-${add.id}`} onClick={() => deleteadd(add.id)}>
                <svg viewBox="0 0 448 512" className="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}