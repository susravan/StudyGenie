/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from './modules/Intl/IntlWrapper';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');
const theme = createMuiTheme();

export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <MuiThemeProvider theme={theme}>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </MuiThemeProvider>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
