import React, { useState } from "react";
import "./reset.css";
import "./bulletin-board.css";
import Detail from "./detail";
import NewData from "./newdata";

function getPage(num) {
  return [(num - 1) * 5, num * 5];
}

function getPageCount(total, perPage) {
  return Math.ceil(total / perPage);
}

function Board() {
  const [list, setList] = useState(mockData);
  const [showNewData, setShowNewData] = useState(false);
  const [clickedData, setClickedData] = useState();
  const [curPage, setPage] = useState(1);
  const [checked, setChecked] = useState([]);

  const page = list.slice(...getPage(curPage));
  const pageCount = getPageCount(list.length, 5);
  const pageList = new Array(pageCount).fill(null).map((_, i) => i + 1);

  return (
    <>
      <div className="bulletin">
        <h1>게시판</h1>
        <div className="createBtn-wrapper">
          <button type="button" onClick={() => setShowNewData(true)}>
            글쓰기
          </button>
        </div>
        <div className="board-wrapper">
          <div className="header">
            <span className="id-col">ID</span>
            <span className="title-col">Title</span>
            <span className="author-col">Author</span>
          </div>
          {page.map((obj) => (
            <div
              key={obj.id}
              className="list"
              onClick={() => {
                setClickedData(obj);
              }}
            >
              <input
                type="checkbox"
                className="checkBox"
                defaultChecked={checked.includes(obj.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  setChecked((prev) => {
                    if (e.target.checked) {
                      return [...prev, obj.id];
                    }

                    return prev.filter((id) => id !== obj.id);
                  });
                }}
              />
              <span className="id-col">{obj.id}</span>
              <span className="title-col">{obj.title}</span>
              <span className="author-col">{obj.author}</span>
              <span className="deleteBtn">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setList((prev) => {
                      const clickId = obj.id;
                      const updata = prev.filter((obj) => obj.id !== clickId);
                      return updata;
                    });
                  }}
                >
                  X
                </button>
              </span>
            </div>
          ))}
        </div>
        <div className="ul-wrapper">
          <ol className="on">
            {pageList.map((el) => (
              <li
                key={el}
                className={curPage === el ? "on" : ""}
                onClick={() => setPage(el)}
              >
                {el}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => {
              setList((prev) => {
                return prev.filter((obj) => !checked.includes(obj.id));
              });
              setChecked([]);
            }}
          >
            일괄삭제
          </button>
        </div>
      </div>
      <Detail
        current={clickedData}
        onClickClose={() => setClickedData(undefined)}
      />
      {showNewData ? (
        <NewData
          onClickClose={() => setShowNewData(false)}
          onClickAdd={(arr) => {
            setList((prev) => {
              return [
                ...prev,
                {
                  id: prev.length + 1,
                  title: arr[0],
                  content: arr[1],
                  author: arr[2],
                },
              ];
            });
            setShowNewData(false);
          }}
        />
      ) : null}
    </>
  );
}

export default Board;

const mockData = [
  {
    id: 1,
    title: "Indian star tortoise",
    content:
      "Major laceration of unspecified external jugular vein, initial encounter",
    author: "Sharia Sycamore",
  },
  {
    id: 2,
    title: "Blue-footed booby",
    content:
      "Poisoning by coronary vasodilators, accidental (unintentional), initial encounter",
    author: "Whit Mallaby",
  },
  {
    id: 3,
    title: "Peacock, blue",
    content: "Toxic effect of hydrogen cyanide, accidental (unintentional)",
    author: "Gusella Cavie",
  },
  {
    id: 4,
    title: "Cape starling",
    content: "Contact with scissors, initial encounter",
    author: "Salvatore Cisco",
  },
  {
    id: 5,
    title: "Eagle, long-crested hawk",
    content: "Cholesteatoma of external ear, unspecified ear",
    author: "Janene Ashworth",
  },
  {
    id: 6,
    title: "Lava gull",
    content: "Crushing injury of left elbow, sequela",
    author: "Jessee Morfett",
  },
  {
    id: 7,
    title: "Lemming, arctic",
    content:
      "Unspecified physeal fracture of lower end of ulna, unspecified arm, subsequent encounter for fracture with routine healing",
    author: "Vidovik Lygoe",
  },
  {
    id: 8,
    title: "Lion, mountain",
    content: "Underdosing of tricyclic antidepressants, sequela",
    author: "Jill Doole",
  },
  {
    id: 9,
    title: "Dog, raccoon",
    content: "Other injury of bronchus, bilateral, subsequent encounter",
    author: "Pauly Casillas",
  },
  {
    id: 10,
    title: "Black-crowned crane",
    content: "Pemphigus",
    author: "Elihu Dadds",
  },
  {
    id: 11,
    title: "Black-crowned crane",
    content: "Pemphigus",
    author: "Elihu Dadds",
  },
];
