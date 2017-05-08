import React from 'react';
import appLayout from '../decorators/appLayout';

@appLayout
export default class RegisterPage extends React.Component {
  static contextTypes = { store: React.PropTypes.object.isRequired };
  static propTypes = {};

  render() {
    return <div>Voter registration.</div>;
  }
}
