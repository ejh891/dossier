import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Shell from 'components/shared/Shell';
import PersonCard from './PersonCard';
import FloatingAddButton from 'components/shared/floatingActionButtons/FloatingAddButton';

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
        {this.props.persons.map(person => {
          return (
            <PersonCard
              key={person._id}
              person={person}
              onClick={() => { this.props.history.push(`/persons/${person._id}`)}}
            />
          );
        })}
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
