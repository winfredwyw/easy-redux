const actions = {
    add: {
        type: 'ADD',
        receive: function (state, action) {
            const count = state.count
            return { count: count + (action.val || 1) }
        },
        dispatch: function (actionType) {
            return function () {
                return {
                    type: actionType,
                    val: 2
                }
            }
        }
    },
    sub: {
        receive: function (state, action) {
            const count = state.count
            return { count: count - 1 }
        },
        dispatch: function (actionType) {
            return function () {
                return (dispatch) => {
                    setTimeout(() => {
                        dispatch({type: actionType})
                    }, 100);
                }
            }
        }
    }
};

export default  actions
