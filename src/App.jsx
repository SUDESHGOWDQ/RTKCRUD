import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
} from "./features/postsSlice";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = () => {
    dispatch(createPost(newPost));
    setNewPost({ title: "", body: "" }); // Reset input fields
  };

  const handleUpdatePost = () => {
    dispatch(updatePost(editingPost));
    setEditingPost(null); // Reset editing state
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div>
      <h1>Posts</h1>

      <div>
        <h2>Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        ></input>
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => setEditingPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}

      {editingPost && (
        <div>
          <h2>Edit Post</h2>
          <input
            type="text"
            value={editingPost.title}
            onChange={(e) =>
              setEditingPost({ ...editingPost, title: e.target.value })
            }
          />
          <input
            value={editingPost.body}
            onChange={(e) =>
              setEditingPost({ ...editingPost, body: e.target.value })
            }
          ></input>
          <button onClick={handleUpdatePost}>Update Post</button>
        </div>
      )}
    </div>
  );
}

export default App;
