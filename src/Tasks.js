import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { useSavedState } from './hooks';

const Tasks = () => {
    const [taskText, setTaskText] = useState('');
    //const [tasks, setTasks] = useState(LocalCache.get('tasks', []));
    const [tasks, setTasks] = useSavedState('tasks', []);
    const [completedTasks, setCompletedTasks] = useSavedState('completedTasks', []);

    const updateTaskText = event => {
        setTaskText(event.target.value);
    }

    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuid() }]);
        setTaskText('');
    }

    const completeTask = completedTask => () => { // second arrow means we return a function, that has completedTask in scope
        setCompletedTasks([...completedTasks, completedTask]);
        setTasks(tasks.filter(task => task.id !== completedTask.id));
    }

    const uncompleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(x => x.id !== task.id));
        setTasks([...tasks, task]);
    }

    const deleteTask = task => () => {
        setCompletedTasks(completedTasks.filter(x => x.id !== task.id));
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
