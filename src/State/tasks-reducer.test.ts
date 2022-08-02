import {TaskStateType} from '../App';
import {removeTaskAC, tasksReducer} from './tasks-reducer';

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
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});