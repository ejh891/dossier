import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import * as personsActions from 'redux/actions/personsActions';

import Shell from 'components/shared/Shell';
import PersonAvatar from 'components/shared/PersonAvatar';
import FloatingAddButton from 'components/shared/floatingActionButtons/FloatingAddButton';
import Records from 'components/records/Records';
import NotFound from 'components/notFound/NotFound';

class Person extends Component {
  constructor(props) {
    super(props);

    this.onFolderClick = this.onFolderClick.bind(this);
  }

  onFolderClick(path) {
    const {
      match,
      history,
    } = this.props;

    const personId = match.params.personId;

    history.push(`/persons/${personId}/records${path}`)
  }

  render() {
    const {
      match,
      history,
      persons,
    } = this.props;

    if (!match.url.includes('records')) {
        return <Redirect to={`${match.url}/records`} />
    }

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    const editPersonPath = `${match.url}/edit`;
    const newRecordPath = `/persons/${personId}/newRecord`;

    const recordPath = history.location.pathname.split('/records')[1] || '/';

    if (!person) {
      return <NotFound />
    }

    const records = person.records.filter(record => record.path.startsWith(recordPath));

    return (
      <Shell
        title={person.name}
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <Records records={records} onFolderClick={this.onFolderClick} path={recordPath} />
        <FloatingAddButton onClick={() => { history.push(newRecordPath)}} />
      </Shell>
    );
  }
}

function mapStateToProps(state) {
  return {
    persons: state.persons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    personsActions: bindActionCreators(personsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
