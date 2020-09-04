import { host } from "./constants/api";

export const loadData = async (state, setNeeds, dispatch) => {
  dispatch({ type: "TOGGLE_LOADING" });
  const response = await fetch(`${host}/needs`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.token}`,
    },
  }).then((res) => res.json());
  dispatch({ type: "TOGGLE_LOADING" });
  setNeeds(response.data);
  return response.data;
};
