function Detail({ current, onClickClose }) {
  if (!current) {
    return null;
  }

  return (
    <div className="detail">
      <h1 className="detail-title">
        {current.title}
        <button type="button" className="detail-btn" onClick={onClickClose}>
          X
        </button>
      </h1>
      <div className="detail-author">{current.author}</div>
      <div className="detail-content">{current.content}</div>
    </div>
  );
}

export default Detail;
