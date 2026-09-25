import urls from "./urls.js";

// The login event sending the data to the api.
export async function loginAPI(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  const url = `${urls.backend}user/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log(response);
  const result = await response.json();
  console.log(result);  

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${result.message}`);
  }

  return result;
}

// The register event sending the data to the api.
export async function registerAPI(formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");

  console.log(email, username, password);

  const url = `${urls.backend}user/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password, confirmation }),
  });

  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${result.message}`);
  }

  return result;
}

// The update event sending the data to the api.
export async function updateAPI(formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");
  const currentPassword = formData.get("currentPassword");

  console.log(email, username, password);
  const url = `${urls.backend}user/profile`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      email,
      username,
      password,
      confirmation,
      currentPassword,
    }),
  });

  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${result.message}`);
  }

  return result;
}

export async function getCurrentUser() {
  const url = `${urls.backend}user/me`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await response.json();
  console.log(result);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${result.message}`);
  }

  return result;
}