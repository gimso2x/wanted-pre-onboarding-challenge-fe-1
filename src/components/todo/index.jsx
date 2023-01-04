import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, getData } from "../../util/fetch";
import AddTodo from "./addTodo";
import TodoDetail from "./detail";
import TodoList from "./list";

export default function Todo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [todos, setTodos] = useState();
  const [invalidated, setInvalidated] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/auth");
  }, []);

  useEffect(() => {
    getData("GET", "/todos", localStorage.getItem("token")).then(({ data }) => {
      setTodos(data);
    });
  }, [invalidated]);

  const updateTodo = async (id, data) => {
    const response = await fetchData(
      "PUT",
      `/todos/${id}`,
      data,
      localStorage.getItem("token")
    );
    setInvalidated((count) => count + 1);
    return response;
  };

  const deleteTodo = (id) => {
    fetchData("DELETE", `/todos/${id}`, {}, localStorage.getItem("token"));
    setInvalidated((count) => count + 1);
  };

  return (
    <>
      <nav style={{ marginBottom: "2rem" }}>
        {localStorage.getItem("token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            로그아웃
          </button>
        ) : (
          <button onClick={() => navigate("/auth")}>로그인/회원가입</button>
        )}
      </nav>
      <section>
        <AddTodo setInvalidated={setInvalidated} />
      </section>
      <section>
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
        {id ? (
          <TodoDetail
            setInvalidated={setInvalidated}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ) : null}
      </section>
    </>
  );
}
