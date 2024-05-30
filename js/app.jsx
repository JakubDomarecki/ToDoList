import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import NewTask from './components/NewTask';
import Task from './components/Task';
import { getTasks } from './api/tasks';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(setTasks);
    }, []);

    const handleAddNewTask = (task) => {
        setTasks((prevTasks) => {
            return [task, ...prevTasks];
        });
    };
    const handleRemoveTask = (id) => {
        setTasks((prevState) => prevState.filter((task) => task.id !== id));
    };

    return (
        <>
            <NewTask onNewTask={handleAddNewTask} />

            {tasks.map((task) => {
                return <Task key={task.id} {...task} onRemoveTask={handleRemoveTask} />;
            })}
        </>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
