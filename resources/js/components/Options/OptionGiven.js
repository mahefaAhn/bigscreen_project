import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Options.css';

const OptionGiven = (props) => {
    const question_label    = props.label;
    const question_id       = props.id;
    const question_options  = JSON.parse(props.options)
    const onChangeFunction  = props.onChangeFunction;
    const disabledField     = props.disableOther;
    
    const code              = props.code;
    const value             = props.value;

    // Without answer
    if(code === 'withoutAnswer'){
        return (
            <div>
                <select required id={question_id} name={question_id} className="bsInput form-control" onChange={onChangeFunction} disabled={disabledField}>
                    <option value="">Choisir</option>
                    {question_options.map( option =>
                        <option key={option}>{option}</option>
                    )}
                </select>
            </div>
        );
    }
    // With answer
    if(code === 'withAnswer'){
        return (
            <div>
                <select required id={question_id} name={question_id} className="bsInput form-control" disabled>
                    <option value="">Choisir</option>
                    {question_options.map( option => 
                        <option key={option} selected={(option===value)}>{option}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default OptionGiven;