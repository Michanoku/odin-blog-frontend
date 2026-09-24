export async function getPosts() {
  const url = "http://localhost:3000/posts/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getSinglePost(postId) {
  const url = `http://localhost:3000/posts/${postId}`;

  console.log("Fetching:", url);

  try {
    const response = await fetch(url);

    console.log("Response received:", response.status);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Result:", result);

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function getAllComments(postId) {
  const url = `http://localhost:3000/posts/${postId}/comments/`;

  console.log("Fetching:", url);

  try {
    const response = await fetch(url);

    console.log("Response received:", response.status);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Result:", result);

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function postComment(postId, commentBody) {
  const url = `http://localhost:3000/posts/${postId}/comments/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentBody }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    console.log("Result:", result);

    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
