import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TaskStateType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';

let startState: TaskStateType = {};
beforeEach(() => {
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
    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(1);
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
});

test('new task should be added correctly', () => {
    //const action = addTaskAC('HEADPHONES', 'todolistId2');
    const action = addTaskAC({
        task: {
            todolistId: 'todolistId2',
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            id: 'taskId1',
            order: 0,
            description: '',
            title: 'HEADPHONES',
            priority: TaskPriorities.Middle,
            startDate: ''
        }
    });

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('HEADPHONES');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('task status should be changed correctly', () => {
    const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].status === TaskStatuses.Completed).toBeFalsy();
    expect(endState['todolistId2'][1].status === TaskStatuses.Completed).toBeFalsy();
});

test('task title should be changed correctly', () => {
    const action = updateTaskAC({taskId: '2', model: {title: 'HEADPHONES'}, todolistId: 'todolistId2'});
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('TYPESCRIPT');
    expect(endState['todolistId2'][1].title).toBe('HEADPHONES');
});

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        todolist: {
            id: '',
            order: 0,
            title: 'new todolist',
            addedDate: ''
        }
    });
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
    const action = removeTodolistAC({id: 'todolistId2'});
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC({
        todolists: [
            {id: '1', title: 'title 1', addedDate: '', order: 0},
            {id: '2', title: 'title 2', addedDate: '', order: 0}
        ]
    });

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be set for todolist', () => {
    const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'});

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action);

    expect(endState['todolistId1'].length).toBe(2);
    expect(endState['todolistId2'].length).toBe(0);
});