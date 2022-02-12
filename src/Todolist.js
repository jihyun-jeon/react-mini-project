import { useState } from "react";

export default function Todolist() {
  const [todos, setTodos] = useState([
    { id: 0, name: "우유 마시기", done: false },
    { id: 1, name: "장보기", done: true },
  ]);

  /* 미완료 버튼 클릭여부 - 체크박스 클릭됐으면 트루(미완료만 보기) */
  const [show, setShow] = useState(false);
  const onShow = (e) => setShow(e.target.checked);

  /* input창에 할일 입력시 */
  const [inputV, setinputV] = useState("");
  const inputChange = (e) => setinputV(e.target.value);

  /* ok버튼 클릭시 */
  const btnClick = () => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), name: inputV, done: false },
    ]);
    setinputV("");
  };

  // [P1] Data.now를 이용하여 아무 랜덤한 아이디 값을 씀.

  /*삭제버튼 */
  const deleteBtn = () =>
    setTodos((prev) => {
      const newArr = [];
      prev.forEach((obj) => {
        if (obj.done === false) {
          // [P2]
          // jsx 내부의 {}중괄호 js에선 안에선 if문 쓸 수 없음. (jsx코드는. return 아래있는 코드! 여기선 써도 무방)
          // ㄴ> jsx에서의 {}에서, 문은 못씀(if문,swith문,함수선언문)
          // ㄴ> (표현식은 됨 - 함수표현식 등.. 값으로 나오는 건 사용 됨.)
          // 지금 여기는 js코드니까 if문 쓸 수 있는 것임.
          newArr.push(obj);
        }
      });
      return newArr;
    });

  return (
    <>
      <ul>
        {todos
          // ★숙제!! filter // 새 배열을 반환함
          .filter((el) => {
            if (show) {
              return el.done === false; // el.done이 false인 것만 모아서 "새 배열로" 반환되고, 다시 이게 리렌더 됨.
            }

            return true;
            //[P3] filter에서의 콜백 - 콜백함수가 true를 반환하면 요소를 유지하고, false를 반환하면 버립니다.
          })
          .map((el, idx) => (
            <li key={el.id}>
              <input
                type="checkbox"
                defaultChecked={el.done}
                onChange={(e) => {
                  setTodos((prev) => {
                    const newTodoTxt = prev.slice();
                    /* [P4]
                  // 1) reference type은 pointer를 바꿔서 데이터 값자체를 바꿔야 함.(원본 배열 안에있는 값을 바꾼다해도 배열의 값자체는 그대로여서 리렌더 되지 않음)
                  // 이런식으로 하면 오류됨.

                  // 2)따라서 아예 레퍼런스를 바꾸도록 값 자체를 아예 새로운 배열로 바꿔야 리렌더링 됨!
                      ㄴ그러기 위해 slice로 배열 복사한 것!
                  */

                    // 3)
                    newTodoTxt[idx].done = e.target.checked;
                    /* [P5]
                  // 여기서의 idx는 map(idx)에 있는 idx를 스코프 체인을 통한 클로져 현상을 통해 받게됨.
                  // map에 있는 콜백 함수는 "3개의 스코프"가 생성됨. // li에 있는 onchange의 콜백함수도 "3개의 스코프"가 생성됨.(함수1당->스코프 1생성)
                  // ㄴ> map의 스코프1 과 li의 스코프1이 연계되있는 꼴이여서, 스코프 체인을 하면 해당 idx값 찾을 수 있음.
                  // 이미 map의 콜백함수가 끝났는데 onchange 발생시 onchange 콜백함수가 실행됨. 따라서 이미 실행이 끝난 함수의 스코프에 접근이 가능한 현상(클로져)
                  // ★숙제!!딥다이브 숙제: 스코프,스코프체인,렉시컬 스코프, 컨텍스트, 클로져
                  */
                    return newTodoTxt;
                  });
                }}
              />
              {/* slice로 딥클론을 하여 아예 새로운 배열을 todos에 넣어줌. 따라서 state값이 새 배열로 바뀌고 리렌더링 됨. */}
              <span>{el.name}</span>
              {el.done ? "완료" : "미완료"}
            </li>
          ))}
      </ul>
      {/*[P5] <form> 으로해서 밑에 있는 버튼타입을 submit으로 하면 인풋창에서 엔터누르면 바로 입력완료 됨.*/}
      <input type="text" value={inputV} onChange={inputChange} />
      <button type="button" onClick={btnClick}>
        OK
      </button>
      <br />
      <br />
      <button type="button" onClick={deleteBtn}>
        Delete
      </button>
      <br />
      <br />
      <input type="checkbox" onChange={onShow} />
      <span>미완료만 보기</span>
    </>
  );
}
