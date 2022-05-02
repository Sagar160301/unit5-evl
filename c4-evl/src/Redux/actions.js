export const ISAUTH = "ISAUTH";
export const USER = "USER";
export const ALL = "ALL";

export const isAuth = (status) => {
  return {
    type: ISAUTH,
    payload: status,
  };
};

export const User = (data) => {
  return {
    type: USER,
    payload: data,
  };
};
export const AllData = (data) => {
  return {
    type: ALL,
    payload: [...data],
  };
};
