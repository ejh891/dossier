import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import * as authActions from 'redux/actions/authActions';
import * as personActions from 'redux/actions/personActions';

import Loading from 'components/shared/fullScreenMessage/Loading';
import Saving from 'components/shared/fullScreenMessage/Saving';
import Deleting from 'components/shared/fullScreenMessage/Deleting';
import Authenticating from 'components/shared/fullScreenMessage/Authenticating';

import Persons from 'components/persons/Persons';
import Person from 'components/person/Person';
import Search from 'components/search/Search';
import NewPerson from 'components/newPerson/NewPerson';
import EditPerson from 'components/editPerson/EditPerson';
import Record from 'components/record/Record';
import NewRecord from 'components/newRecord/NewRecord';
import EditRecord from 'components/editRecord/EditRecord';
import NotFound from 'components/notFound/NotFound';
import SignIn from 'components/auth/SignIn';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.authActions.observeAuthState();
  }

  componentDidUpdate(prevProps) {
    // on sign in
    if (prevProps.user === null && this.props.user !== null) {
      this.props.personActions.fetchPersons();
    }
  }

  render() {
    const {
      initializing,
      saving,
      deleting,
    } = this.props;

    if (initializing) {
      return (
        <Loading />
      );
    }

    if (saving) {
      return (
        <Saving />
      );
    }

    if (deleting) {
      return (
        <Deleting />
      );
    }

    if (deleting) {
      return (
        <Authenticating />
      );
    }

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Persons} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/persons" component={Persons} />
          <Route exact path="/search" component={Search} />

          <Route exact path="/newPerson" component={NewPerson} />

          <Route exact path="/persons/:personId" component={Person} />
          <Route path="/persons/:personId/records" component={Person} />

          <Route exact path="/persons/:personId/records/:recordId" component={Record} />
          <Route exact path="/persons/:personId/editRecord/:recordId" component={EditRecord} />
          <Route exact path="/persons/:personId/newRecord" component={NewRecord} />

          <Route exact path="/persons/editPerson/:personId" component={EditPerson} />

          <Route path="*" component={NotFound}/>
        </Switch>
        <ToastContainer position="bottom-center"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initializing: state.initializing,
    saving: state.saving,
    deleting: state.deleting,
    authenticating: state.authenticating,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    personActions: bindActionCreators(personActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
