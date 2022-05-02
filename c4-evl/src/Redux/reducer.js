import { ISAUTH, USER, ALL } from "./actions";

const init = {
  auth: false,
  user: "",
  all: [],
};

export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case ISAUTH:
      return {
        ...store,
        auth: !store.auth,
      };
    case USER:
      return {
        ...store,
        user: payload,
      };
    case ALL:
      return {
        ...store,
        all: payload,
      };
    default:
      return store;
  }
};
