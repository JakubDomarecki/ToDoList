import React, { useState } from 'react';
import { removeOperation, updateOperation } from '../api/operations';
import Button from './button.jsx';
function Operation({ description, id, onRemoveOperation, timeSpent: _timeSpent, status }) {
    const [timeSpentForm, setTimeSpentForm] = useState(false);
    const [timeSpent, setTimeSpent] = useState(_timeSpent);
    const [timeSpentInput, setTimeSpentInput] = useState('');

    const handleTimeSave = (e) => {
        e.preventDefault();

        // Validate input (number > 0)
        if (isNaN(parseInt(timeSpentInput)) || timeSpentInput < 0) {
            return;
        }

        const operation = {
            description,
            timeSpent: parseInt(timeSpent) + parseInt(timeSpentInput),
        };

        updateOperation(id, operation, (data) => {
            // Update local time spent state
            setTimeSpent(data.timeSpent);

            // Hide form
            setTimeSpentForm(false);
            setTimeSpentInput('');
        });
    };

    const handleRemove = () => {
        removeOperation(id, () => {
            onRemoveOperation(id);
        });
    };

    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {description}
                {timeSpent > 0 && (
                    <span className="badge bg-success ml-2">
            {hours}h {minutes}m
          </span>
                )}
            </div>

            {timeSpentForm && (
                <form onSubmit={handleTimeSave}>
                    <div className="input-group input-group-sm">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Spent time in minutes"
                            value={timeSpentInput}
                            style={{ width: '12rem' }}
                            onChange={(e) => setTimeSpentInput(e.target.value)}
                        />
                        <div className="input-group-append">
                            <Button color={'success'} outline> Add</Button>
                            <Button color={'dark'} outline onClick={() => setTimeSpentForm(false)} >Cancel</Button>
                        </div>
                    </div>
                </form>
            )}

            {!timeSpentForm && (
                <div>
                    {status === 'open' && (
                        <Button
                            color={'success'}
                            outline
                            small
                            className={'mr-2'}
                            onClick={() => setTimeSpentForm(true)}
                        >
                            Add time
                        </Button>
                    )}
                    <Button color={'danger'} outline small onClick={handleRemove}>
                        Delete
                    </Button>
                </div>
            )}
        </li>
    );
}

export default Operation;
