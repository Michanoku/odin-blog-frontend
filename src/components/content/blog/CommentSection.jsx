import { useState } from "react";
import { SquarePen, Trash } from "lucide-react";

import {
  postComment,
  updateComment,
  deleteComment,
} from "../../../api/content.js";
import "../../../styles/content/blog/CommentSection.css";

// A single comment under a post
function Comment({ comment, user, editComment, removeComment }) {
  // Used when a comment is being edited
  const [edit, setEdit] = useState(false);

  // Check if the user is the owner of the comment, and if yes, show buttons to edit or delete
  const isOwner = user?.id === comment.user.id;
  const buttons = isOwner ? (
    <div className="commentButtons">
      <button className="icon" onClick={() => setEdit(true)}>
        <SquarePen />
      </button>
      <button className="icon" onClick={() => removeComment(comment.id)}>
        <Trash />
      </button>
    </div>
  ) : null;

  // If the comment is being edited, show the edit form, if not show the comment
  const body = edit ? (
    <form
      className="contentWidth"
      onSubmit={(event) => {
        editComment(event);
        setEdit(false);
      }}
    >
      <input type="hidden" name="commentId" value={comment.id} />
      <textarea
        name="commentBody"
        maxLength={1000}
        rows={6}
        defaultValue={comment.body}
      />
      <div className="commentButtons">
        <button
          type="button"
          className="cancelButton"
          onClick={() => setEdit(false)}
        >
          Cancel
        </button>
        <button type="submit">Update</button>
      </div>
    </form>
  ) : (
    <>
      <div>{comment.body}</div>
      {buttons}
    </>
  );

  return (
    <div className="contentSpacing" key={comment.id}>
      <div className="contentMeta">
        {comment.user.username}{" "}
        <span className="contentMeta">
          -{" "}
          {new Date(comment.createdAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </span>
      </div>
      {body}
    </div>
  );
}

// The comment section with all comments
export function CommentSection({ comments, setComments, postId, user }) {
  // Submit a new comment
  async function submitComment(event) {
    // Get the comment data
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Post the new comment and add it to the comment data
      const newComment = await postComment(postId, formData.get("commentBody"));
      setComments((comments) => [newComment, ...comments]);
      form.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  // Edit a comment
  async function editComment(event) {
    // Get the comment data
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      // Update the comment and replace the prior one with the new one in the data
      const updatedComment = await updateComment(
        postId,
        formData.get("commentId"),
        formData.get("commentBody"),
      );
      setComments((comments) =>
        comments.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      );

      form.reset();
    } catch (error) {
      alert(error.message);
    }
  }

  // Remove a comment
  async function removeComment(commentId) {
    // Make the user confirm his intention
    const confirmation = confirm(
      "Are you sure you want to delete this comment?",
    );
    if (confirmation) {
      try {
        // Delete the comment and remove it from the comment data
        await deleteComment(postId, commentId);
        setComments((comments) =>
          comments.filter((comment) => comment.id !== commentId),
        );
      } catch (error) {
        alert(error.message);
      }
    }
  }

  // If the user is logged in, they can use this form to post a new comment
  const form = user ? (
    <form className="contentWidth" onSubmit={submitComment}>
      <h3 className="contentHeader">Join the discussion</h3>
      <textarea name="commentBody" placeholder="" maxLength={1000} rows={6} />
      <button type="submit">Post comment</button>
    </form>
  ) : null;

  return (
    <>
      <div className="contentWidth">
        <h3 className="contentHeader">Comments</h3>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            user={user}
            key={comment.id}
            editComment={editComment}
            removeComment={removeComment}
          />
        ))}
      </div>
      {form}
    </>
  );
}
