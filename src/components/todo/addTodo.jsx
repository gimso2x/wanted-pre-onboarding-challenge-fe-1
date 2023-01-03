import { useState } from "react";
import { fetchData } from "../../util/fetch";

export default function AddTodo({ setInvalidated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(
      "POST",
      "/todos",
      { title, content },
      localStorage.getItem("token")
    )
      .then((data) => {
        setInvalidated((count) => count + 1);
        clearInput();
      })
      .then((error) => {
        clearInput();
      });
  };

  const clearInput = () => {
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", padding: "0.5rem", marginBottom: "1rem" }}
    >
      <label>
        Title
        <input
          type="text"
          placeholder="추가할 Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Content
        <input
          type="text"
          placeholder="추가할 Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </label>
      <button type="submit" className="min">
        추가
      </button>
    </form>
  );
}
