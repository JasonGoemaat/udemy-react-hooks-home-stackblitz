import React, { useState } from 'react';
import uuid from 'uuid/v4';
import LocalCache from './LocalCache';
import { useSavedState } from './hooks';

const Tasks = () => {
    const [taskText, setTaskText] = useState('');
    //const [tasks, setTasks] = useState(LocalCache.get('tasks', []));
    const [tasks, setTasks] = useSavedState('tasks', []);
    const [completedTasks, setCompletedTasks] = useState(LocalCache.get('completedTasks', []));

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        const updatedTasks = [...tasks, { taskText, id: uuid() }];
//        LocalCache.set('tasks', updatedTasks);
        setTasks(updatedTasks);
        setTaskText('');
    }

    const completeTask = completedTask => () => { // second arrow means we return a function, that has completedTask in scope
        const updatedCompleted = [...completedTasks, completedTask];
        const updatedTasks = tasks.filter(task => task.id != completedTask.id);
        setCompletedTasks(updatedCompleted);
        setTasks(updatedTasks);
        LocalCache.set('completedTasks', updatedCompleted);
//        LocalCache.set('tasks', updatedTasks);
    }

    const uncompleteTask = task => () => {
        const updatedCompleted = completedTasks.filter(x => x.id !== task.id);
        const updatedTasks = [...tasks, task];
        setCompletedTasks(updatedCompleted);
        setTasks(updatedTasks);
        LocalCache.set('completedTasks', updatedCompleted);
        // LocalCache.set('tasks', updatedTasks);
    }

    const deleteTask = task => () => {
        const updatedCompleted = completedTasks.filter(x => x.id !== task.id);
        setCompletedTasks(updatedCompleted);
        LocalCache.set('completedTasks', updatedCompleted);
    }

    return (
        <div>
            <h3>Tasks</h3>
            <div className="form">
                <input value={taskText} onChange={updateTaskText}/>
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {
                    tasks.map(task => {
                        const { id, taskText } = task;
                        return (
                            <div key={id} onClick={completeTask(task)}>{taskText}</div>
                        )
                    })
                }
            </div>
            <div className="completed-list">
                {
                    completedTasks.map(task => {
                        const { id, taskText } = task;

                        return (
                            <div key={id}>
                                <span onClick={uncompleteTask(task)}>
                                    {taskText}{' '}
                                </span>
                                <span onClick={deleteTask(task)} className='delete-task'>x</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tasks;
