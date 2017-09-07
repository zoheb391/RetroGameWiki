import React from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'

const renderField = ({input, placeholder, label, type, meta: {touched, error, warning}}) => {
    const renderTextArea = () => (
        <div>
            <textarea rows='5' className='form-control' {...input} placeholder={placeholder} type={type} />
              {touched &&
                ((error && <span>{error}</span>) ||
                  (warning && <span>{warning}</span>))}
        </div>
    )
    const renderInput = () => (
        <div>
            <input className='form-control' {...input} placeholder={placeholder} type={type} />
              {touched &&
                ((error && <span>{error}</span>) ||
                  (warning && <span>{warning}</span>))}
        </div>
    )
    return(
      <div>
        <label>{label.toUpperCase()}</label>
        {label==='description' ? renderTextArea() : renderInput()}
      </div>
    )
}

//validation object passed to form
const validate = values => {
  const errors = {}

  if (!values.year) {
      errors.year = 'required'
  }
  if (!values.name) {
      errors.name = 'required'
  } else if (values.name.length < 4) {
      errors.name = 'sorry bud too short'
  }
  if (!values.description) {
      errors.description = 'required'
  }

  return errors
}

const Form = props => {
    let { submitAction, uploadPicture, handleSubmit, picture } = props

    return (
        <div className='row scrollable'>
            <div className='col-md-offset-2 col-md-8'>
                <div className='text-left'>
                    <Link to='/games' className='btn btn-info'>Back</Link>
                </div>
                <div className='panel panel-default'>
                    <div className='panel-heading'>
                        <h2 className='panel-title text-center'>
                            Add a Game!
                        </h2>
                    </div>
                    <div className='panel-body'>
                        <form className='game-form' onSubmit={handleSubmit(submitAction)}>

                            <div className='form-group text-left'>
                                <Field
                                    name='name'
                                    type='text'
                                    placeholder='Enter your Name'
                                    component={renderField}
                                    label='name'
                                />
                            </div>

                            <div className='form-group text-left'>
                                <Field
                                    name='description'
                                    type='text'
                                    component={renderField}
                                    placeholder='Enter the Description'
                                    label='description'
                                />
                            </div>

                            <div className='form-group text-left'>
                                <Field
                                    name='year'
                                    type='number'
                                    component={renderField}
                                    placeholder='Enter the Year'
                                    label='year'
                                />
                            </div>

                            <div className='form-group text-left'>
                                <label htmlFor='picture'>PICTURE</label>
                                <div className='text-center dropup'>
                                    <button
                                        id='button-upload'
                                        type='button'
                                        className='btn btn-danger'
                                        onClick={() => uploadPicture()}>

                                        Upload <span className='caret' />
                                    </button>
                                </div>
                            </div>

                            <div className='form-group text-center'>
                                <img
                                    id='picture'
                                    className='img-responsive img-upload'
                                    src= {picture}
                                />
                            </div>

                            <button type='submit' className='btn btn-submit btn-block'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({ form: 'game', validate })(Form)
