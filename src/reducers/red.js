import update from "immutability-helper";

const initialState = {
  test: [
    { title: "hyperomegatest", id: 1 },
    { title: "not-so-giga-test", id: 2 }
  ]
};
function rootReducer(state = initialState, action) {
  if (action.type === "set") {
    return update(state.test, { $push: action.payload });
  }
  return state;
}
export default rootReducer;
export function setTest(payload) {
  return { type: "set", payload };
}
