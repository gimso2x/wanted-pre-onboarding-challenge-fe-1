import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, getData } from "../../util/fetch";

export default function TodoDetail({ setInvalidated, updateTodo, deleteTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateMode, setUpdateMode] = useState(false);
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getTodoById();
  }, [id]);

  const getTodoById = () => {
    getData("GET", `/todos/${id}`, localStorage.getItem("token")).then(
      ({ data }) => setDetail(data)
    );
  };

  const handleModifyMode = () => {
    setUpdateMode(true);
    setTitle(detail.title);
    setContent(detail.content);
  };

  const handleModify = () => {
    updateTodo(id, { title, content }).then(() => {
      setUpdateMode(false);
    });
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {!updateMode ? (
        <>
          <nav style={{ justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <button className="min" onClick={handleModifyMode}>
              수정
            </button>
            <button
              className="min"
              onClick={() => {
                deleteTodo(detail.id);
                navigate("/");
              }}
            >
              삭제
            </button>
          </nav>
          <p>{detail.title}</p>
          <p>{detail.content}</p>
        </>
      ) : (
        <>
          <nav style={{ justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <button className="min" onClick={handleModify}>
              수정
            </button>
            <button className="min" onClick={() => setUpdateMode(false)}>
              취소
            </button>
          </nav>
          <p>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </p>
          <p>
            <input
              type="text"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </p>
        </>
      )}
    </form>
  );
}
