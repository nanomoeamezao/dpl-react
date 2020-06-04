import update from "immutability-helper";
import {combineReducers} from 'redux'


const appReducer = (state = {
    id:"",
    name:"",
    theme:"",
    status:"",
  }, action ) =>{
    console.log(action)
    switch (action.type){
      case 'enPush':
        return action.payload
      case 'statUpd':
        return action.payload
      default:
        return state
    }
  }
  
const testReducer = (state = {test: [{ title: "hyperomegatest" }, { title: "hyperomegatest2" }]}, action)=>{
  if (action.type === 'push'){
    return Object.assign({}, state, {test: state.test.concat(action.payload)})
  }
  else
    return state
}

const authReducer = (state = {authenticated: false}, action)=>{
  if (action.type === 'updAuth'){
    return state = action.payload
  }
  else return state
}

const rootReducer = combineReducers({appReducer, testReducer, authReducer})

export default rootReducer
export function pushTest(payload) {
  return { type: "push", payload };
}

export function updAuth(payload){
  return { type: "updAuth", payload}
}
export function entryPush(payload){
  return { type: "enPush", payload}
}
export function statUpd(payload){
  return { type: "statUpd", payload}
}