import "./app.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import AddItemForm from "./AddItemForm";
import deleteicon from "./delete.svg"
import logoreact from "./logo.png"

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
    element.style.animation = "swing-out-top-bck 0.45s cubic-bezier(0.600, -0.280, 0.735, 0.045) both";
  
    const siblings = Array.from(element.parentNode.children);
    const index = siblings.indexOf(element);
  
    siblings.slice(index + 1).forEach((sibling) => {
      sibling.classList.add('moving');
    });
  
    setTimeout(() => {
      set((currentadd) => {
        return currentadd.filter((add) => add.id !== id);
      });
  
      siblings.slice(index + 1).forEach((sibling) => {
        sibling.classList.remove('moving');
      });
    }, 450);
  }

  // Sort the todos based on completion status
  const sortedTodos = add.slice().sort((a, b) => b.completed - a.completed);

  return (
    <>
    <div className="logod"><img className="logo" src={logoreact} /></div>
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
                <span className="IconContainer">
                  <img className="icon" src={deleteicon} />
                </span>
                <p className="text">Delete</p>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}