import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducerActions from './action';

let ID = 0;
const reducerReceivers = {};
const actionsReceivers = {};

const defaultState = { count: 0 };

const reducerEnter = function (state = defaultState, action) {
    const receiver = reducerReceivers[action.type];

    if (!receiver) return state;

    return receiver(state, action);
}

const createReducerAction = function (receive, action) {
    const type = 'ACTION' + (++ID);
    const receiver = reducerReceivers[type];

    if (receiver) {
        console.warn('[mShark Redux]: exist action');
        return;
    }

    reducerReceivers[type] = receive;


    return action(type);
}

for (let key in reducerActions) {
    actionsReceivers[key] = createReducerAction(reducerActions[key].receive, reducerActions[key].dispatch);
}

console.log(reducerReceivers, actionsReceivers)

export const store = createStore(reducerEnter, applyMiddleware(thunk));
export const actions = actionsReceivers;
