import {todolistsReducer} from './todolists-reducer';
import {v4 as uuid4} from 'uuid';
import {todolistPropsType} from '../App';
import {ActionType} from './todolists-reducer';

test('correct todolist should be removed', () => {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    const startState: Array<todolistPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];
    const endState = todolistsReducer(startState, <ActionType>{
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    let newTodolistTitle = 'New Todolist';
    const startState: Array<todolistPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];
    const endState = todolistsReducer(startState, <ActionType>{
        type: 'ADD-TODOLIST',
        title: newTodolistTitle
    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('All');
});

test('correct todolist should change its name', () => {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();
    let newTodolistTitle = 'New Todolist';
    const startState: Array<todolistPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});
