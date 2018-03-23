import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import List from 'material-ui/List/List';

import Shell from 'components/shared/Shell';
import PersonRow from './PersonRow';
import FloatingAddButton from 'components/shared/floatingActionButtons/FloatingAddButton';
import FloatingActionButtonBuffer from 'components/shared/floatingActionButtons/FloatingActionButtonBuffer';

class Persons extends Component {
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
      <Shell>
        <List>
          {this.props.persons.map(person => {
            return (
              <PersonRow
                key={person._id}
                person={person}
                onClick={() => { this.props.history.push(`/persons/${person._id}`)}}
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

export default connect(mapStateToProps, null)(Persons);
