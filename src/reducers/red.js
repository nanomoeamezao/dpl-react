import update from "immutability-helper";

const initialState = {
  test: [
    { title: "hyperomegatest" },
    { title: "not-so-giga-test" }
  ]
};
function rootReducer(state = initialState, action) {
  if (action.type === "push") {
    return Object.assign({}, state, {test: state.test.concat(action.payload)})
  }
  return state;
}
export default rootReducer;
export function pushTest(payload) {
  return { type: "push", payload };
}
