import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = {age: 33, childrenCount: 1, name: 'Alex'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(34)
    expect(endState.childrenCount).toBe(1)
});

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 33, childrenCount: 1, name: 'Alex'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.age).toBe(33)
    expect(endState.childrenCount).toBe(2)
});

test('user reducer should change only name', () => {
    const startState = {age: 33, childrenCount: 1, name: 'Alex'};
    const newName = 'Lex';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName);
});
