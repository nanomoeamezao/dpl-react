import React from 'react'
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    console.log(state)
    return { test: state.testReducer.test }
}
const ConnectedList = ({ test }) => (
    <div>
        <p>Test list</p>
        <ul>
            {test.map((el) => (
                <li key={el.id}>{el.title}</li>
            ))}
        </ul>
    </div>
)
const TestList = connect(mapStateToProps)(ConnectedList)
export default TestList
