import React, { useState, useEffect } from 'react';
import Operations from './Operations';
import Button from './button.jsx';
import { removeTask, updateTask } from '../api/tasks';
import { getOperations } from '../api/operations';

function Task({ title, description, id, status: _status, onRemoveTask }) {
    const [status, setStatus] = useState(_status);
    const [operations, setOperations] = useState([]);
    const [operationForm, setOperationForm] = useState(false);

    useEffect(() => {
        getOperations(id, setOperations);
    }, []);

    const toggleOperationForm = () => {
        setOperationForm((prevState) => !prevState);
    };

    const handleFinish = () => {
        const task = {
            title,
            description,
            status: 'closed',
        };
        updateTask(id, task, () => {
            setStatus('closed');
        });
    };

    const handleRemove = () => {
        removeTask(id, () => {
            onRemoveTask(id);
        });
    };

    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{title}</h5>
                    <h6 className="card-subtitle text-muted">{description}</h6>
                </div>

                <div>
                    {status === 'open' && (
                        <>
                            <Button color="info" small onClick={toggleOperationForm} className="mr-2">
                                Add operation
                            </Button>

                            <Button color="dark" small onClick={handleFinish}>
                                Finish
                            </Button>
                        </>
                    )}
                    {operations.length === 0 && (
                        <Button
                            color={'danger'}
                            outline
                            small
                            onClick={handleRemove}
                            className="ml-2"
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </div>

            <Operations
                taskID={id}
                form={operationForm}
                setForm={setOperationForm}
                operations={operations}
                setOperations={setOperations}
                status={status}
            />
        </section>
    );
}

export default Task;
