import React, { Component } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const mapDispatchToProps = {
    doLogin: credentials => ({ type: 'do::login', payload: credentials })
}

const mapStateToProps = state => ({
    errors: state.authentication.errors
})


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

const Login = props =>  {

  let { handleSubmit, doLogin, errors } = props

    return (
        <div className="row scrollable">
            <div className="col-md-offset-2 col-md-8">
                <div className="text-left">
                    <Link to="/games" className="btn btn-info">Back</Link>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title text-center">Login</h2>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit(doLogin)}>
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
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({ form: 'login' })(connect(mapStateToProps, mapDispatchToProps)(Login));
