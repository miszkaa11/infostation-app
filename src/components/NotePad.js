import React, { useState } from 'react';
// Sass
import './NotePad.scss';

const Notepad = () => {
    const [note, setNote] = useState('');

    const handleChange = (event) => {
        setNote(event.target.value);
    };

    const handleSave = () => {
        console.log('Zapisano notatkę:', note);
    };

    return (
        <div className="component p-2">
            <div className="container-m">
                <div className="notepad">
                    <div className="notepad__inner">
                        <div className="title">
                            <h2 className="title__header header-xl">Notepad</h2>
                        </div>
                        <textarea
                            rows="10"
                            cols="50"
                            value={note}
                            onChange={handleChange}
                            placeholder="Enter your note here..."
                        />
                        <div className="cta">
                            <button className="submit__btn btn" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notepad;
