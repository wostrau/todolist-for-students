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
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

let startState: TaskStateType = {};
beforeEach(()=> {
    startState = {
        'todolistId1': [
            {
                id: '1',
                todolistId: 'todolistId1',
                title: 'REACT JS',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: '2',
                todolistId: 'todolistId1',
                title: 'TYPESCRIPT',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ],
        'todolistId2': [
            {
                id: '1',
                todolistId: 'todolistId2',
                title: 'MONITOR',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
            {
                id: '2',
                todolistId: 'todolistId2',
                title: 'COMPUTER',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Later,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: ''
            },
        ],
    };
})

test('correct task should be deleted from correct way', () => {
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
});

test('new task should be added correctly', () => {
    const action = addTaskAC('HEADPHONES', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('HEADPHONES');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('task status should be changed correctly', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].status === TaskStatuses.Completed).toBeFalsy();
    expect(endState['todolistId2'][1].status === TaskStatuses.Completed).toBeFalsy();
});

test('task title should be changed correctly', () => {
    const action = changeTaskTitleAC('2', 'todolistId2', 'HEADPHONES');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('TYPESCRIPT');
    expect(endState['todolistId2'][1].title).toBe('HEADPHONES');
});

test('new array should be added when new todolist is added', () => {
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
    const action = removeTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});