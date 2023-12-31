export function useCreatePost() {
  const createPost = async (formData) => {
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
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

// export function useGetAllPost() {
//   const getAllPost = async ({ startIndex, limit }) => {
//     try {
//       const res = await fetch(
//         `/api/post/get?startIndex=${startIndex}&limit=${limit}`
//       );
//       const data = await res.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return getAllPost;
// }

export function useGetAllPost() {
  const getAllPost = async (skip) => {
    const res = await fetch(`api/post/get?skip=${skip}`);
    // console.log(res);
    const data = await res.json();
    return data;
  };
  return getAllPost;
}

// export function useGetOnePercent() {
//   const OnePercent = async ({ startIndex, limit }) => {
//     try {
//       const res = await fetch(
//         `/api/post/getOnePercent?startIndex=${startIndex}&limit=${limit}`
//       );
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return OnePercent;
// }

export function useGetOnePercent() {
  const OnePercent = async (skip) => {
    try {
      const res = await fetch(`/api/post/getOnePercent?skip=${skip}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return OnePercent;
}

// export function useGetAllUserPost() {
//   const getAllUserPost = async ({ startIndex = 0, limit, id }) => {
//     try {
//       const res = await fetch(
//         `/api/user/getuserpost/${id}?startIndex=${startIndex}&limit=${limit}`
//       );
//       const data = await res.json();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return getAllUserPost;
// }

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

export function useDislikePost() {
  const dislikePost = async (id) => {
    try {
      const res = await fetch(`/api/post/dislike/${id}`);
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
  return dislikePost;
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
