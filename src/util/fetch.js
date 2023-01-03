export async function getData(method = "GET", url = "", authorization = false) {
  const authHeader = authorization
    ? {
        Authorization: authorization,
      }
    : null;

  const response = await fetch(`http://localhost:8080${url}`, {
    method: method,
    headers: { "Content-Type": "application/json", ...authHeader },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function fetchData(
  method = "GET",
  url = "",
  data = {},
  authorization = false
) {
  const authHeader = authorization
    ? {
        Authorization: authorization,
      }
    : null;

  const response = await fetch(`http://localhost:8080${url}`, {
    method: method,
    headers: { "Content-Type": "application/json", ...authHeader },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
