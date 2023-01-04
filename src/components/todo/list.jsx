import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoList({ todos, updateTodo, deleteTodo }) {
  const navigate = useNavigate();
  const [updateModeId, setUpdateModeId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form>
      <ul>
        {todos?.length ? (
          todos.map((todo, idx) => (
            <li key={idx}>
              {updateModeId !== todo.id ? (
                <>
                  <p onClick={() => navigate(`/${todo.id}`)}>
                    {todo.title} / {todo.content}
                  </p>
                  <button
                    className="min"
                    onClick={() => {
                      setTitle(todo.title);
                      setContent(todo.content);
                      setUpdateModeId(todo.id);
                    }}
                  >
                    수정
                  </button>
                  <button className="min" onClick={() => deleteTodo(todo.id)}>
                    삭제
                  </button>
                </>
              ) : (
                <div>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    /
                    <input
                      type="text"
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="min"
                      onClick={() => updateTodo(todo.id, { title, content })}
                    >
                      수정
                    </button>
                    <button className="min" onClick={() => setUpdateModeId("")}>
                      취소
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>추가된 Todo가 없습니다</p>
        )}
      </ul>
    </form>
  );
}
