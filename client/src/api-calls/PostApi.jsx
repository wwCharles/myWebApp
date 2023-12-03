export function useCreatePost() {
  const createPost = async (formData, id) => {
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: id,
        }),
      });
      const data = await res.json();
      if (data === undefined) {
        return false;
      }

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return createPost;
}

export function useGetPostbyId() {
  const getPostbyId = async (id) => {
    try {
      const res = await fetch(`/api/post/get/${id}`);
      const data = await res.json();
      if (data === null || data === undefined) {
        return false;
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return getPostbyId;
}

export function useGetAllPost() {
  const getAllPost = async ({ startIndex = 0, limit }) => {
    try {
      const res = await fetch(
        `/api/post/get?startIndex=${startIndex}&limit=${limit}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getAllPost;
}

export function useGetAllUserPost() {
  const getAllUserPost = async (id) => {
    try {
      const res = await fetch(`/api/user/getuserpost/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getAllUserPost;
}

export function useLikePost() {
  const likePost = async (id) => {
    try {
      const res = await fetch(`/api/post/like/${id}`);
      const data = await res.json();
      if (data === undefined) {
        return undefined;
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return likePost;
}
export function useFlagPost() {
  const flagPost = async (id) => {
    try {
      const res = await fetch(`/api/post/flag/${id}`);
      const data = await res.json();
      if (data === undefined) {
        return undefined;
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return flagPost;
}

export function useDeletePost() {
  const deletePost = async (id) => {
    try {
      const res = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return deletePost;
}
