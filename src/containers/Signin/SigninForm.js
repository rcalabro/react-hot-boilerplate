import React, { PropTypes, Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { onSubmitActions } from 'redux-form-submit-saga'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button'

import './Signin.scss'

class SigninForm extends Component {

  getValidationState = ({ touched, error, warning }) => {
    if (touched && error) {
      return { validationState: 'error' }
    } else if (touched && warning) {
      return { validationState: 'warning' }
    }
    return undefined
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => (

    <FormGroup {...this.getValidationState({ touched, error, warning })}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={10}>
        <FormControl componentClass="input" type={type} placeholder={label} {...input}/>
        <HelpBlock>Enter a client name to simulate ads checkout and deals.</HelpBlock>
        {touched && ((error && <HelpBlock>{error}</HelpBlock>) || (warning && <HelpBlock>{warning}</HelpBlock>))}
      </Col>
    </FormGroup>
  )

  render() {
    const { handleSubmit, submitting, error } = this.props

    return (
      <Form onSubmit={handleSubmit} horizontal>
        <Field name="username" type="text" label="Username" component={this.renderField} />
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" disabled={submitting} bsStyle="primary">
              Sign in
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

SigninForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string
}

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  return errors
}

SigninForm = reduxForm({
  form: 'signinForm',
  onSubmit: onSubmitActions('SIGNIN'),
  validate
})(SigninForm)

export default SigninForm
