import {TaskStateType} from '../App';
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {removeTodolistAC} from './todolists-reducer';

test('correct task should be deleted from correct way', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
});

test('new task should be added correctly', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = addTaskAC('HEADPHONES', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('HEADPHONES');
    expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('task status should be changed correctly', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = changeTaskStatusAC('2', 'todolistId2', false);
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].isDone).toBeFalsy();
    expect(endState['todolistId2'][1].isDone).toBeFalsy();
});

test('task title should be changed correctly', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = changeTaskTitleAC('2', 'todolistId2', 'HEADPHONES');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('TYPESCRIPT');
    expect(endState['todolistId2'][1].title).toBe('HEADPHONES');
});

test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = addTodolistAC('new todolist');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
    });

test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'REACT JS', isDone: false},
            {id: '2', title: 'TYPESCRIPT', isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: 'MONITOR', isDone: false},
            {id: '2', title: 'COMPUTER', isDone: true},
        ],
    };

    const action = removeTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});