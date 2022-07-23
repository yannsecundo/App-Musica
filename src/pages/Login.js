import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputUser: '',
      isButtonDisabled: true,
      loading: false,
      logued: false,
    };
  }

  buttonCondition = () => {
    const { inputUser } = this.state;
    const inputMinLength = 3;
    this.setState({ isButtonDisabled: inputUser.length < inputMinLength });
  };

  onHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputUser: value }, this.buttonCondition);
  };

  onHandleClick = () => {
    this.setState({ loading: true }, async () => {
      const { inputUser } = this.state;
      await createUser({ name: inputUser });
      if (this.isMount) {
        this.setState({ loading: false, logued: true });
      }
    });
  };

  render() {
    const { inputUser, isButtonDisabled, loading, logued } = this.state;
    return (
      <div data-testid="page-login">
        {logued && <Redirect to="/search" />}
        {loading && <Loading />}
        <Header />
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ inputUser }
            onChange={ this.onHandleChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.onHandleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
