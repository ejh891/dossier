import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as personsActions from 'redux/actions/personsActions';

import Persons from 'components/persons/Persons';
import Person from 'components/person/Person';
import NewPerson from 'components/newPerson/NewPerson';
import EditPerson from 'components/editPerson/EditPerson';
import Record from 'components/record/Record';
import NewRecord from 'components/newRecord/NewRecord';
import EditRecord from 'components/editRecord/EditRecord';
import NotFound from 'components/notFound/NotFound';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.personsActions.fetchAllPersons();
  }

  render() {
    const {
      initializing
    } = this.props;
    
    if (initializing) {
      return (
        <div>Loading</div>
      );
    }

    return (
      <Switch>
        <Route exact path="/" component={Persons} />
        <Route exact path="/persons" component={Persons} />

        <Route exact path="/persons/:personId" component={Person} />
        <Route path="/persons/:personId/records" component={Person} />

        <Route exact path="/newPerson" component={NewPerson} />
        <Route exact path="/persons/:personId/edit" component={EditPerson} />
        <Route exact path="/persons/:personId/records/:recordId" component={Record} />
        <Route exact path="/persons/:personId/records/:recordId/edit" component={EditRecord} />
        <Route exact path="/persons/:personId/newRecord" component={NewRecord} />
        <Route path="*" component={NotFound}/>
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    initializing: state.initializing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personsActions: bindActionCreators(personsActions, dispatch)
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
