import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = { user: '', loading: true };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div
        data-testid="header-component"
      >
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{user.name}</p>
        )}
        <Link data-testid="link-to-search" to="/Search">pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/Favorites">favoritos</Link>
        <Link data-testid="link-to-profile" to="/Profile">perfil</Link>
      </div>
    );
  }
}
