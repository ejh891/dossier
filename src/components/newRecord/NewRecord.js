import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import * as recordActions from 'redux/actions/recordActions';

import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';
import PersonAvatar from 'components/shared/PersonAvatar';

class NewRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      value: '',
      path: '',
    };

    this.textFieldOnChange = this.textFieldOnChange.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  textFieldOnChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  async saveRecord() {
    const {
      match,
      history,
      recordActions,
    } = this.props;

    const personId = match.params.personId;

    let path = this.state.path;

    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (!path.endsWith('/')) {
      path = path + '/';
    }

    const record = {
      key: this.state.key,
      value: this.state.value,
      path,
      personId,
    };

    await recordActions.addRecord(record);

    history.goBack();
  }

  render() {
    const {
      match,
      history,
      persons,
    } = this.props;

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    if (!person) {
      return <Redirect to="/" />
    }

    return (
      <Shell
        title="New Data"
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <TextField
          onChange={(event) => { this.textFieldOnChange('key', event); }}
          floatingLabelText="Title"
          fullWidth={true}
        />
        <TextField
          onChange={(event) => { this.textFieldOnChange('value', event); }}
          floatingLabelText="Details"
          fullWidth={true}
        />
        <TextField
          onChange={(event) => { this.textFieldOnChange('path', event); }}
          floatingLabelText="Folder (Optional)"
          fullWidth={true}
        />
        <FloatingSaveButton onClick={this.saveRecord}/>
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
    recordActions: bindActionCreators(recordActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecord);
