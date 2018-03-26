import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';

import List from 'material-ui/List/List';
import SearchIcon from 'material-ui/svg-icons/action/search';

import Shell from 'components/shared/Shell';
import PersonRow from './PersonRow';
import FloatingAddButton from 'components/shared/floatingActionButtons/FloatingAddButton';
import FloatingActionButtonBuffer from 'components/shared/floatingActionButtons/FloatingActionButtonBuffer';

import * as personActions from 'redux/actions/personActions';

import RouteUtil from 'utils/RouteUtil';

class Persons extends Component {
  constructor(props) {
    super(props);

    this.onEditPersonClick = this.onEditPersonClick.bind(this);
  }

  async onEditPersonClick(personId) {
    const {
      history,
    } = this.props;

    history.push(RouteUtil.getEditPersonRoute(personId));
  }

  async onDeletePersonClick(personId) {
    const {
      personActions,
    } = this.props;

    await personActions.deletePerson(personId);
  }

  render() {
    const {
      match,
      history,
    } = this.props;

    if (!match.url.includes('persons')) {
      return <Redirect to={`${match.url}persons`} />
  }

    const newPersonPath = '/newPerson';
    
    return (
      <Shell
        iconElementRight={<SearchIcon />}
        onRightIconButtonClick={() => { history.push('/search'); }}
      >
        <List>
          {this.props.persons.map(person => {
            return (
              <PersonRow
                key={person._id}
                person={person}
                onClick={() => { this.props.history.push(`/persons/${person._id}`)}}
                onEditClick={() => { this.onEditPersonClick(person._id); }}
                onDeleteClick={() => { this.onDeletePersonClick(person._id); }}
              />
            );
          })}
        </List>
        <FloatingActionButtonBuffer />
        <FloatingAddButton onClick={() => { history.push(newPersonPath)} } />
      </Shell>
    );
  }
}


function mapStateToProps(state) {
  return {
    persons: state.persons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
