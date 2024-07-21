import React, { useState, useEffect } from 'react';
// Sass
import './ToDo.scss';
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ToDo = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    // LocalStorage Data
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('todo-items')) || [];
        setItems(storedItems);
    }, []);

    // LocalStorage update
    useEffect(() => {
        localStorage.setItem('todo-items', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        if (newItem.trim() !== '') {
            setItems([...items, newItem]);
            setNewItem('');
        }
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const clearList = () => {
        setItems([]);
    };

    return (
        <div className="to-do">
            <div className="to-do__inner">
                <div className="to-do__title">
                    <h3 className="header-l">Add task</h3>
                </div>
                <div className="d-flex">
                    <input
                        type="text"
                        className="search__btn"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add task"
                    />
                    <button className="btn margined" onClick={addItem}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <div className="to-do__inner">
                <div className="to-do__title">
                    <h3 className="header-l">Task</h3>
                </div>
                <ul className="to-do__list">
                    {items.length === 0 ? (
                        <li className="to-do__list--item no-tasks">No tasks yet</li>
                    ) : (
                        items.map((item, index) => (
                            <li className="to-do__list--item" key={index}>
                                {item}{' '}
                                <button
                                    className="list__btn btn"
                                    onClick={() => removeItem(index)}
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </li>
                        ))
                    )}
                </ul>
                {items.length > 1 && (
                    <div className="clear">
                        <button className="clear__btn btn" onClick={clearList}>
                            Clear All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToDo;
