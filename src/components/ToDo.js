import React, { useState } from 'react';
// Sass
import './ToDo.scss';

const ToDo = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

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
        <div className="component p-2">
            <div className="container-m">
                <div className="to-do bg-light">
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
                                placeholder="Set task"
                            />
                            <button className="btn margined" onClick={addItem}>Add</button>
                        </div>
                    </div>
                    <div className="to-do__inner">
                        <div className="to-do__title">
                            <h3 className="header-l">Task</h3>
                        </div>
                        <ul className="list">
                            {items.map((item, index) => (
                                <li className="list__item" key={index}>
                                    {item}{' '}
                                    <button className="list__btn btn" onClick={() => removeItem(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        {items.length > 1 && (
                            <div className="clear">
                                <button className="clear__btn btn" onClick={clearList}>Clear All</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;
