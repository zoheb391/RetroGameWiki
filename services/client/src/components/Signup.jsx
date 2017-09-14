import React, { Component } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const mapDispatchToProps = {
    doSignup: credentials => ({ type: 'do::signup', payload: credentials })
}

//server side errors
const mapStateToProps = state => ({
    errors: state.authentication.errors
})

// validation errors
const validate = values => {
    let errors = {}

    if (!values.email){
        errors.email = 'required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'invalid email'
    }

    if(!values.password){
        errors.password = 'required'
    } else if (values.password.length < 6) {
        errors.password = 'minimum 6 characters'
    }

    return errors
}

const renderField = ({input, placeholder, label, type, meta: {touched, error, warning}}) => {
    return(
      <div>
        <label>{label.toUpperCase()}</label>
        <div>
            <input className='form-control' {...input} placeholder={placeholder} type={type} />
              {touched &&
                ((error && <span>{error}</span>) ||
                  (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
}

const renderErrors = errors => {
    return (
        <div className="form-group text-left">
            <label
                htmlFor="errors"
                style= {{ color: '#d9534f'}}>

                  Error</label>
            <li className="error" style= {{ color: '#d9534f'}}>
                {errors[0]}
            </li>
        </div>
    )
}

const Signup = props =>  {

  let { handleSubmit, doSignup, errors } = props

    return (
        <div className="row scrollable">
            <div className="col-md-offset-2 col-md-8">
                <div className="text-left">
                    <Link to="/games" className="btn btn-info">Back</Link>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title text-center">Signup</h2>
                    </div>
                    <div className="panel-body">
                        <form className='signup-form' onSubmit={handleSubmit(doSignup)}>
                            <div className="form-group text-left">
                                <Field
                                    name="email"
                                    type="text"
                                    component={renderField}
                                    placeholder="Enter your email"
                                    label='email'
                                />
                            </div>
                            <div className="form-group text-left">
                                <Field
                                    name="password"
                                    component={renderField}
                                    type="password"
                                    placeholder="Enter the password"
                                    label='password'
                                />
                            </div>
                            { errors.length > 0 && renderErrors(errors) }
                            <button
                                type="submit"
                                className="btn btn-submit btn-block"
                            >
                                Signup
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({ form: 'signup', validate })(connect(mapStateToProps, mapDispatchToProps)(Signup));
