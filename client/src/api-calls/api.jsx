/*
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

// user

export function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  return logout;
}

export function useUpdateUser() {
  const dispatch = useDispatch();

  const updateUser = async (formData, id) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return updateUser;
}

export function useGetUserbyId() {
  const getUserbyId = async (id) => {
    // console.log(id);
    try {
      const res = await fetch(`/api/user/get/${id}`);
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getUserbyId;
}

export function useGetAllUsers() {
  const getAllUsers = async () => {
    try {
      const res = await fetch(`/api/user/all`);
      console.log(res);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getAllUsers;
}

export function useFriendStat() {
  const getFriendStat = async (id) => {
    // console.log(id);
    try {
      const res = await fetch(`/api/user/friend/${id}`);
      console.log("res", res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getFriendStat;
}

export function useGetAllUserPost() {
  const getAllUserPost = async (id) => {
    console.log("ok", id);
    try {
      const res = await fetch(`/api/user/getuserpost/${id}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return getAllUserPost;
}

// post

export function useInitPost() {
  const initPost = async (formData, id) => {
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
      console.log(data);
      if (data === undefined) {
        return false;
      }

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return initPost;
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
  const initGetAllPost = async () => {
    try {
      const res = await fetch("/api/post/get");
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return initGetAllPost;
}

export function useLikePost() {
  const likePost = async (id) => {
    // console.log(id);
    try {
      const res = await fetch(`/api/post/like/${id}`);
      const data = await res.json();
      console.log(data);
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
    // console.log(id);
    try {
      const res = await fetch(`/api/post/flag/${id}`);
      // console.log(res);
      const data = await res.json();
      console.log(data);
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
  const initDelete = async (id) => {
    try {
      const res = await fetch(`/api/post/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return;
      }
      return data;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  return initDelete;
}
*/
