export const initialValue = {
  file: {
    isFetching: false,
    refresh: false,
  },
  user: {
    isFetching: false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    error: null,
    token: localStorage.getItem("token"),
  },
};
