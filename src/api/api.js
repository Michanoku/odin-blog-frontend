// The login event sending the data to the api.
export async function loginAPI(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);
  return {
    token: "totallyrealtoken",
    user: {
      id: 42,
      email: email,
      username: "Michael",
    },
  };
}

// The register event sending the data to the api.
export async function registerAPI(formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");

  console.log(email, username, password);
  return {
    token: "totallyrealtoken",
    user: {
      id: 42,
      email: email,
      username: username,
    },
  };
}

// The update event sending the data to the api.
export async function updateAPI(formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmation = formData.get("confirmation");
  const currentPassword = formData.get("currentPassword");

  console.log(email, username, password);
  return {
    token: "totallyrealtoken",
    user: {
      id: 42,
      email: email,
      username: username,
    },
  };
}