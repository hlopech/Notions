const baseUrl = "http://localhost:5002";

const fetchGetRequest = async (url) => {
  return fetch(`${baseUrl}${url}`).then((r) => {
    if (!r.ok) {
      throw new Error(` ${r.status}`);
    }
    return r.json();
  });
};

export const getNotes = async (userId) => {
  try {
    const user = await fetchGetRequest(`/users/${userId}/`);
    const notes = await fetchGetRequest(`/users/${user.id}/notes`);
    return notes;
  } catch (error) {
    throw error;
  }
};

export const getUsers = () => {
  return fetchGetRequest(`/users`);
};

export const getNote = (id) => {
  return fetchGetRequest(`/notes/${id}`);
};

const fetchPatchRequest = async (url, data) => {
  return fetch(`${baseUrl}${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateNote = (id, data) => {
  return fetchPatchRequest(`/notes/${id}`, data);
};

const fetchDeleteRequest = (url) => {
  return fetch(`${baseUrl}${url}`, {
    method: "DELETE",
  });
};
export const deleteNote = (id) => {
  return fetchDeleteRequest(`/notes/${id}`);
};

const fetchPostRequest = async (url, data) => {
  return fetch(`${baseUrl}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
export const addNote = (data) => {
  return fetchPostRequest(`/notes`, data);
};

export const addUser = (data) => {
  return fetchPostRequest(`/users`, data);
};
