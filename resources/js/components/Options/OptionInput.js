import React, { useState } from 'react';

const OptionInput = (props) => {
    const [error,setError]      = useState(null);
    const question_label        = props.label;
    const question_id           = props.id;
    const question_input_type   = props.input_type;
    const onChangeFunction      = props.onChangeFunction;
    const ifMailInput           = (props.id=='1') ? 'email' : 'text';
    const errorIfMail           = props.errorIfMail;
    const disabledField         = (question_id!='1') ? (props.disableOther) : false;

    const code                  = props.code;
    const value                 = props.value;
    // Without answer
    if(code=='withoutAnswer'){
        return (
            <div>
                {(question_input_type=='text') ? 
                    <div>
                        <input required type={ifMailInput} id={question_id} name={question_id} placeholder={question_label} className={(question_id==1 && errorIfMail!=null) ? "is-invalid form-control" : "form-control bsInput"} maxLength="255" onChange={onChangeFunction} disabled={disabledField}/>
                        {(question_id==1 && errorIfMail!=null) ? <label className='text-danger'>{errorIfMail}</label> : ""}
                    </div> :
                    (question_input_type=='textarea') ?
                        <textarea required id={question_id} name={question_id} placeholder={question_label} className="form-control bsInput" maxLength="255" onChange={onChangeFunction} disabled={disabledField}></textarea>
                    : null
                }
                
            </div>
        );
    }
    // With answer
    else if(code=='withAnswer'){
        return (
            <div>
                {(question_input_type=='text') ? 
                    <div>
                        <input required type={ifMailInput} id={question_id} name={question_id} className="form-control bsInput" maxLength="255" defaultValue={value} disabled/>
                    </div> :
                    (question_input_type=='textarea') ?
                        <textarea required id={question_id} name={question_id} className="form-control bsInput" maxLength="255" defaultValue={value} disabled></textarea>
                    : null
                }
                
            </div>
        );
    }
}

export default OptionInput;