import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

class AppLayout extends React.Component {
  static propTypes = { children: PropTypes.any };

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default (Component) => {
  const C = props => (
    <AppLayout>
      <Component {...props} />
    </AppLayout>
  );
  C.displayName = `appLayout(${Component.displayName || Component.name})`;
  return C;
};
