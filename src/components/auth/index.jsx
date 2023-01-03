import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../util/fetch";

export default function Auth() {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid =
    email.includes("@") && email.includes(".") && password.length >= 8;

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  useEffect(() => {
    clearInput();
  }, [isLoginPage]);

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isLoginPage ? "/users/login" : "/users/create";
    fetchData("POST", url, { email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .then((error) => {
        clearInput();
      });
  };

  return (
    <>
      <section>
        <ul className="tab">
          <li>
            <button
              className={!isLoginPage ? "nonActive" : ""}
              onClick={() => setIsLoginPage(true)}
            >
              로그인
            </button>
          </li>
          <li>
            <button
              className={isLoginPage ? "nonActive" : ""}
              onClick={() => setIsLoginPage(false)}
            >
              회원가입
            </button>
          </li>
        </ul>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input1">Email:</label>
          <input
            type="text"
            id="input1"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="input2">Password:</label>
          <input
            type="password"
            id="input2"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ width: "calc(100% - 1.6rem)" }}
          />
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
