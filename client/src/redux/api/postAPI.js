import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((req) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    // The API returned an error message
    return { error: error.response.data.message, data: null };
  } else {
    // An unexpected error occurred
    return { error: "An unexpected error occurred.", data: null };
  }
};
const createPost = async (formData) => {
  try {
    const { data } = await API.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getPosts = async (userId, limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(
      `/posts?userId=${userId}&limit=${limit}&skip=${skip}`
    );
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getComPosts = async (id, limit = 10, skip = 0) => {
  try {
    const { data } = await API.get(`/posts/${id}?limit=${limit}&skip=${skip}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const deletePost = async (id) => {
  try {
    const { data } = await API.delete(`/posts/${id}`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const likePost = async (id, userId) => {
  try {
    const { data } = await API.patch(`/posts/${id}/like`, { userId });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const unlikePost = async (id, userId) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unlike`, { userId });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const addComment = async (id, newComment) => {
  try {
    const { data } = await API.post(`/posts/${id}/comment`, { newComment });
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getComments = async (id) => {
  try {
    const { data } = await API.get(`/posts/${id}/comment`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const savePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/save`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const unsavePost = async (id) => {
  try {
    const { data } = await API.patch(`/posts/${id}/unsave`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getSavedPosts = async () => {
  try {
    const { data } = await API.get(`/posts/saved`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

const getPublicPosts = async (publicUserId) => {
  try {
    const { data } = await API.get(`/posts/${publicUserId}/userPosts`);
    return { error: null, data };
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  createPost,
  getPosts,
  getComPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  savePost,
  unsavePost,
  getSavedPosts,
  getPublicPosts,
};
