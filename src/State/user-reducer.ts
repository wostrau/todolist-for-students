type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}
export const userReducer = (state: StateType, action: ActionType): StateType => {
    let newState = {...state};
    switch (action.type) {
        case 'INCREMENT-AGE':
            newState.age = state.age + 1;
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            newState.childrenCount = state.childrenCount + 1;
            return newState;
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            };
        default:
            throw new Error('I do not understand this type of action')
    }
};