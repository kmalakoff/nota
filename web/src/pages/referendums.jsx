import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import appLayout from '../decorators/appLayout';

@appLayout
@observer
export default class ReferendumPage extends React.Component {
  static contextTypes = { store: PropTypes.object.isRequired };
  static propTypes = {};

  render() {
    const { referendums } = this.context.store.data.referendums;

    return (
      <div>
        <h1>Referendums</h1>
        {referendums.map(x => <div key={x.referendumId}>{x.name}</div>)}
      </div>
    );
  }
}
