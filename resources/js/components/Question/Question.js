import React, { useState } from 'react';
import './Question.css';
/* Components Options */
import OptionGiven  from '../../components/Options/OptionGiven';
import OptionInput  from '../../components/Options/OptionInput';

const Question = (props) => {
    const dataQuestion      = props.data;
    const nbQuestion        = props.nbQuestion;

    /* For question without answer */
    const handleChange      = props.onChangeFunction;
    const disableOther      = props.disableOther;
    const errorIfMail       = props.errorIfMail;
    if(handleChange!==undefined && disableOther!==undefined && errorIfMail!==undefined){
        return (
            <div className="mb-3 questionBloc rounded">
                <label className="font-weight-bold text-light"> Question {dataQuestion.id+'/'+nbQuestion}</label>
                <p className="font-weight-bold text-white">{dataQuestion.title}</p>
                {dataQuestion.types.name == 'A' || dataQuestion.types.name == 'C' ?
                 <OptionGiven id={dataQuestion.id} key={dataQuestion.id} options={dataQuestion.options.content} onChangeFunction={handleChange} disableOther={disableOther} code="withoutAnswer"/> :
                 <OptionInput id={dataQuestion.id} key={dataQuestion.id} input_type={dataQuestion.input_type} onChangeFunction={handleChange} errorIfMail={errorIfMail}  disableOther={disableOther} code="withoutAnswer"/>
                }
            </div>
        );
    }
    /* For question with answer */
    else{
        const answerUser    = props.answerUser;
        return (
            <div className="mb-3 questionBloc rounded">
                <label className="font-weight-bold text-light"> Question {dataQuestion.id+'/'+nbQuestion}</label>
                <p className="font-weight-bold text-white">{dataQuestion.title}</p>
                {dataQuestion.types.name == 'A' || dataQuestion.types.name == 'C' ?
                 <OptionGiven id={dataQuestion.id} key={dataQuestion.id} options={dataQuestion.options.content} value={answerUser} code="withAnswer"/> :
                 <OptionInput id={dataQuestion.id} key={dataQuestion.id} input_type={dataQuestion.input_type} value={answerUser} code="withAnswer"/>
                }
            </div>
        );
    }
    
}

export default Question;