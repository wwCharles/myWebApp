import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

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
    try {
      const res = await fetch(`/api/user/get/${id}`);
      const data = await res.json();
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
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getAllUsers;
}

export function useGetFriendStatus() {
  const getFriendStatus = async (id) => {
    try {
      const res = await fetch(`/api/user/friend/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return getFriendStatus;
}

export function useLogoutUser() {
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error));
    }
  };

  return logoutUser;
}

export function useDeleteAccount() {
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return deleteAccount;
}
