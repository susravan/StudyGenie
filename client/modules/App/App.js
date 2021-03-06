import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';

import Header from './components/Header/Header';
import { addMyNoteFilter, removeMyNoteFilter } from '../Note/NoteActions';
import { bindActionCreators } from 'redux';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="Study Genie - Note App"
            titleTemplate="%s - Note App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            dispatch={this.props.dispatch}
            auth_status={this.props.auth_status}
            addMyNoteFilter={this.props.addMyNoteFilter}
            removeMyNoteFilter={this.props.removeMyNoteFilter}
          />
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  auth_status: PropTypes.string.isRequired,
  addMyNoteFilter: PropTypes.func.isRequired,
  removeMyNoteFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  intl: state.intl,
  auth_status: state.auth.auth_status,
});

function mapDispatchToProp(dispatch) {
  return {
    ...bindActionCreators({
      addMyNoteFilter,
      removeMyNoteFilter
    }, dispatch),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(App);
