import { useState } from "react/cjs/react.development";

function NewData({ onClickClose, onClickAdd }) {
  const [titleData, setTitleData] = useState("");
  const [contentData, setContentData] = useState("");
  const [authorData, setAuthorData] = useState("");

  return (
    <div className="newData">
      <button type="button" className="newDel" onClick={onClickClose}>
        X
      </button>
      <p>
        {/*p는 블록요소임 */}
        <label htmlFor="title">제목</label>
        <input
          id="title"
          onChange={(e) => setTitleData(e.target.value)}
          value={titleData}
        />
      </p>
      <p>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          onChange={(e) => setContentData(e.target.value)}
          value={contentData}
        />
      </p>
      <p>
        <label htmlFor="author">작성자</label>
        <input
          id="author"
          onChange={(e) => setAuthorData(e.target.value)}
          value={authorData}
        />
      </p>
      <div className="addBtn-wrapper">
        <button
          type="button"
          className="addBtn"
          onClick={() => onClickAdd([titleData, contentData, authorData])}
        >
          등록
        </button>
      </div>
    </div>
  );
}
export default NewData;
