import { useState } from "react";

function Prac() {
  /* 리스트 */
  const [todos, setTodo] = useState([
    { id: 0, name: "우유 마시기", done: false },
    { id: 1, name: "장보기", done: true },
  ]);

  /* 추가버튼 */
  const [inputV, setinputV] = useState("");
  const todoInput = (e) => setinputV(e.target.value);
  const todoOK = () => {
    if (inputV === "") {
      alert("할일을 입력하세요!");
      return;
    }
    setTodo((prev) => [...prev, { id: Date.now(), name: inputV, done: false }]);
    setinputV("");
  };

  /* 미완료만 보기 */
  const [show, setShow] = useState(false); // true면 미완료만 보여짐
  const onShow = (e) => setShow(() => e.target.checked);

  /* delete */
  const onDel = () =>
    setTodo((prev) => prev.filter((obj) => obj.done === false));

  return (
    <>
      <ul>
        {todos
          .filter((obj) => {
            if (show) {
              return obj.done === false;
            }
            return true;
          })
          .map((obj, idx) => (
            <li key={obj.id}>
              <input
                type="checkbox"
                defaultChecked={obj.done}
                onChange={(e) =>
                  setTodo((prev) => {
                    const newTodos = prev.slice();
                    newTodos[idx].done = e.target.checked;
                    return newTodos;
                  })
                }
              />
              {obj.name} -{obj.done ? "완료" : "미완료"}
            </li>
          ))}
      </ul>
      <input type="text" onChange={todoInput} value={inputV} />
      <button type="button" onClick={todoOK}>
        OK
      </button>
      <br />
      <br />
      <input type="checkbox" onChange={onShow} /> <span>미완료만 보기</span>
      <br />
      <br />
      <button type="button" onClick={onDel}>
        Delete
      </button>
    </>
  );
}

export default Prac;
