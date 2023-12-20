import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isCredential: false,
    errorMsg: '',
    showPassword: false,
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  loginFailure = error => {
    this.setState({isCredential: true, errorMsg: error})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitForm = async event => {
    event.preventDefault()

    let {username, password} = this.state

    if (username.toLowerCase().trim(' ') === 'vidya') username = 'rahul'
    if (password === 'vidya@2001') password = 'rahul@2021'

    const userDetails = {username, password}
    const loginApi = ' https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      isCredential,
      errorMsg,
      showPassword,
    } = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const inputType = showPassword ? 'text' : 'password'

    return (
      <div className="login-container">
        <img
          className="logo"
          alt="website login"
          src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949409/logo_ip0o9f.png"
        />
        <div className="login-details-container">
          <img
            className="website-logo"
            alt="website logo"
            src="https://res.cloudinary.com/dxjowybhg/image/upload/v1663949395/website-logo_gsc5ig.png"
          />
          <h1 className="website-heading">Insta Share</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input"
                value={username}
                id="username"
                placeholder="vidya"
                type="text"
                onChange={this.onUsername}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input"
                value={password}
                id="password"
                placeholder="vidya@2001"
                type={inputType}
                onChange={this.onPassword}
              />
            </div>
            <br />
            <div className="show-password-container">
              <input
                id="checkbox"
                type="checkbox"
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="checkbox" className="show-password">
                Show Password
              </label>
            </div>
            {isCredential && <p className="error">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
