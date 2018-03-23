import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import FlatButton from 'material-ui/FlatButton';

import * as appActions from 'redux/actions/appActions';
import * as personActions from 'redux/actions/personActions';
import * as recordActions from 'redux/actions/recordActions';

import Shell from 'components/shared/Shell';
import PersonAvatar from 'components/shared/PersonAvatar';
import FloatingAddButton from 'components/shared/floatingActionButtons/FloatingAddButton';
import Records from 'components/records/Records';
import NotFound from 'components/notFound/NotFound';
import FloatingActionButtonBuffer from 'components/shared/floatingActionButtons/FloatingActionButtonBuffer';

import RouteUtil from 'utils/RouteUtil';

class Person extends Component {
  constructor(props) {
    super(props);

    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    
    this.onFolderClick = this.onFolderClick.bind(this);

    this.onEditPersonClick = this.onEditPersonClick.bind(this);

    this.onDeleteRecordClick = this.onDeleteRecordClick.bind(this);
    this.onEditRecordClick = this.onEditRecordClick.bind(this);
  }

  onBackButtonClick() {
    const {
      history,
      editing,
      appActions,
    } = this.props;

    // if editing, exit editing
    if (editing) {
      appActions.toggleEditing(false);
    }

    let currentURL = history.location.pathname;
    if (currentURL.endsWith('/')) {
      currentURL = currentURL.slice(0, -1);
    }

    // split, remove last path, re-join
    const newURL = currentURL.split('/').slice(0, -1).join('/');

    // if we hit back at the root directory, go to persons
    if (newURL.indexOf('records') === -1) {
      history.push('/persons');
    } else {
      history.push(newURL);
    }
  }

  onFolderClick(directory) {
    const {
      match,
      history,
    } = this.props;

    const personId = match.params.personId;
    const path = directory.getFullPath();
    history.push(RouteUtil.getRecordRoute(personId, path));
  }

  async onEditPersonClick() {
    // stub
  }

  async onDeleteRecordClick(recordId) {
    const {
      recordActions,
    } = this.props;

    await recordActions.deleteRecord(recordId);
  }

  async onEditRecordClick(recordId) {
    //stub
  }

  render() {
    const {
      match,
      history,
      persons,
      editing,
    } = this.props;

    if (!match.url.includes('records')) {
        return <Redirect to={`${match.url}/records`} />
    }

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    const recordPath = history.location.pathname.split('/records')[1] || '/';

    if (!person) {
      return <NotFound />
    }

    return (
      <Shell
        title={person.name}
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={this.onBackButtonClick}
        iconElementRight={<FlatButton label={editing ? "done" : "edit"} />}
        onRightIconButtonClick={this.onEditPersonClick}
      >
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <Records
          records={person.records}
          path={recordPath}
          onFolderClick={this.onFolderClick}
          onDeleteRecordClick={this.onDeleteRecordClick}
          onEditRecordClick={this.onEditRecordClick}
        />
        <FloatingActionButtonBuffer />
        <FloatingAddButton onClick={() => { history.push(RouteUtil.getNewRecordRoute(personId))}} />
      </Shell>
    );
  }
}

function mapStateToProps(state) {
  return {
    persons: state.persons,
    editing: state.editing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    personActions: bindActionCreators(personActions, dispatch),
    recordActions: bindActionCreators(recordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
