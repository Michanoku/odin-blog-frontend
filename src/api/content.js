// All API communication that have to do with posts and comments are in this file
import { contactAPI } from "./api.js";

// Get all posts from the backend
export async function getPosts() {
  const path = "posts";
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return contactAPI(path, options);
}

// Get only a single post from the backend
export async function getSinglePost(postId) {
  const path = `posts/${postId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return contactAPI(path, options);
}

// Get all comments for a post using the postId
export async function getAllComments(postId) {
  const path = `posts/${postId}/comments/`;
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return contactAPI(path, options);
}

// Post a new comment to a post
export async function postComment(postId, commentBody) {
  const path = `posts/${postId}/comments/`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ commentBody }),
  };
  return contactAPI(path, options);
}

// Update an existing comment on a post
export async function updateComment(postId, commentId, commentBody) {
  const path = `posts/${postId}/comments/${commentId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ commentBody }),
  };
  return contactAPI(path, options);
}

// Delete an existing comment on a post
export async function deleteComment(postId, commentId) {
  const path = `posts/${postId}/comments/${commentId}`;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return contactAPI(path, options);
}
