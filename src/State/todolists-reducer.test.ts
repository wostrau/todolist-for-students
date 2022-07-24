import {
    RemoveTodolistAC,
    todolistsReducer,
    AddTodolistAC,
    ChangeTitleTodolistAC,
    ChangeFilterTodolistAC
} from './todolists-reducer';
import {v4 as uuid4} from 'uuid';
import {changeFilterPropsType, todolistPropsType} from '../App';

test('correct todolist should be removed', () => {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();

    const startState: Array<todolistPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const action = RemoveTodolistAC(todolistId1);

    const endState = todolistsReducer(startState, action);

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

    const action = AddTodolistAC(newTodolistTitle);

    const endState = todolistsReducer(startState, action);

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

    const action = ChangeTitleTodolistAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const todolistId1 = uuid4();
    const todolistId2 = uuid4();

    let newFilter: changeFilterPropsType = 'Completed';

    const startState: Array<todolistPropsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const action = ChangeFilterTodolistAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});