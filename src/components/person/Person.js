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
import RouteUtil from 'utils/RouteUtil';

class Person extends Component {
  constructor(props) {
    super(props);

    this.onFolderClick = this.onFolderClick.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
  }

  onBackButtonClick() {
    const {
      match,
      history,
    } = this.props;

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

    const recordPath = history.location.pathname.split('/records')[1] || '/';

    if (!person) {
      return <NotFound />
    }

    return (
      <Shell
        title={person.name}
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={this.onBackButtonClick}
      >
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <Records records={person.records} onFolderClick={this.onFolderClick} path={recordPath} />
        <FloatingAddButton onClick={() => { history.push(RouteUtil.getNewRecordRoute(personId))}} />
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
