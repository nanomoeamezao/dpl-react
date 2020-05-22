import update from "immutability-helper";

const initialState = {
  test: [
    { title: "hyperomegatest" },
    { title: "not-so-giga-test" }
  ],
  app: {
    id:"",
    name:"",
    theme:"",
    status:"",
  }

};
function rootReducer(state = initialState, action) {
  if (action.type === "push") {
    return Object.assign({}, state, {test: state.test.concat(action.payload)})
  }
  if (action.type === "enPush"){
    return action.payload
  }
  if (action.type === "statUpd"){
    console.log(action.payload)
    return action.payload
  }
  return state;
}

export default rootReducer;
export function pushTest(payload) {
  return { type: "push", payload };
}
export function entryPush(payload){
  return { type: "enPush", payload}
}
export function statUpd(payload){
  return { type: "statUpd", payload}
}