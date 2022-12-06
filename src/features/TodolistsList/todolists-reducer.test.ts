import {
    addTodolistAC, changeEntityStatusTodolistAC,
    changeFilterPropsType,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v4 as uuid4} from 'uuid';
import {TodolistType} from '../../api/todolists-api';
import {RequestStatusType} from '../../app/app-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = uuid4();
    todolistId2 = uuid4();
    startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'All',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
    ];
});

test('correct todolist should be removed', () => {
    const action = removeTodolistAC({id: startState[0].id});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        addedDate: '',
        order: 0,
        id: 'any id'
    };

    const action = addTodolistAC({todolist: todolist});
    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(todolist.title);
    expect(endState[2].filter).toBe('All');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTitleTodolistAC({id: startState[1].id, title: newTodolistTitle});
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: changeFilterPropsType = 'Completed';

    const action = changeFilterTodolistAC({id: startState[1].id, filter: newFilter});
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const action = changeEntityStatusTodolistAC({id: startState[1].id, status: newStatus});
    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});

test('todolists should be set to the state correctly', () => {
    const action = setTodolistsAC({todolists: startState});
    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});