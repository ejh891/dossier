import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

import * as recordActions from 'redux/actions/recordActions';

import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';
import PersonAvatar from 'components/shared/PersonAvatar';
import ImageInput from 'components/shared/ImageInput';

class EditRecord extends Component {
  constructor(props) {
    super(props);

    const {
      persons,
      match
    } = props;

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    const recordId = match.params.recordId;
    const record = person.records.find(record => record._id === recordId);

    this.state = {
      title: record.title,
      notes: record.notes,
      imageURL: record.imageURL,
    };

    this.textFieldOnChange = this.textFieldOnChange.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  textFieldOnChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  onAddImage(imageURL) {
    this.setState({
      imageURL,
    })
  }

  onRemoveImage() {
    this.setState({
      imageURL: undefined
    });
  }

  async saveRecord() {
    const {
      match,
      history,
      recordActions,
    } = this.props;

    const personId = match.params.personId;
    const recordId = match.params.recordId;

    const record = {
      title: this.state.title,
      notes: this.state.notes,
      imageURL: this.state.imageURL,
      personId,
    };

    await recordActions.editRecord(recordId, record);

    history.goBack();
  }

  render() {
    const {
      match,
      history,
      persons,
    } = this.props;

    const {
      title,
      notes,
      imageURL,
    } = this.state;

    const personId = match.params.personId;
    const person = persons.find(person => person._id === personId);

    if (!person) {
      return <Redirect to="/" />
    }

    const recordId = match.params.recordId;
    const record = person.records.find(record => record._id === recordId);

    if (!record) {
      return <Redirect to="/" />
    }

    return (
      <Shell
        title={`Edit ${record.title}`}
        iconElementLeft={<KeyboardArrowLeftIcon />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px'}}>
          <PersonAvatar person={person} size={80} />
        </div>
        <TextField
          onChange={(event) => { this.textFieldOnChange('title', event); }}
          floatingLabelText="Title"
          fullWidth={true}
          value={title}
        />
        <TextField
          onChange={(event) => { this.textFieldOnChange('notes', event); }}
          floatingLabelText="Notes (optional)"
          fullWidth={true}
          value={notes}
        />
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <ImageInput
            onAddImage={this.onAddImage}
            onRemoveImage={this.onRemoveImage}
            placeholder={<IconButton><AddPhotoIcon color={'rgba(0,0,0,0.3)'}/></IconButton>}
            imagePreviewURL={imageURL}
            width={'90%'}
            height={150}
          />
        </div>
        <FloatingSaveButton onClick={this.saveRecord} disabled={title === ''}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRecord);
