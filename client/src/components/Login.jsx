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

const Login = props =>  {

  let { handleSubmit, doLogin, errors } = props

  const renderErrors = errors => {
      return (
          <div className="form-group text-left">
              <label
                  htmlFor="errors"
                  style= {{ color: 'red'}}>

                    Error</label>
              <li className="error" style= {{ color: 'red'}}>
                  {errors[0]}
              </li>
          </div>
      )
  }

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
                                <label htmlFor="name">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    component="input"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    component='input'
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter the password"
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
