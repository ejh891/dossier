import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton'
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';

import * as personActions from 'redux/actions/personActions';
import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';
import ImageInput from 'components/shared/ImageInput';

class NewPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      profilePhotoURL: undefined,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.savePerson = this.savePerson.bind(this);
  }

  onTextFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  async savePerson() {
    const {
      history,
    } = this.props;

    const person = {
      name: this.state.name,
      profilePhotoURL: this.state.profilePhotoURL,
    };

    await this.props.personActions.addPerson(person);

    history.goBack();
  }

  onAddImage(profilePhotoURL) {
    this.setState({
      profilePhotoURL,
    })
  }

  onRemoveImage() {
    this.setState({
      profilePhotoURL: undefined
    });
  }

  render() {
    const {
      history,
    } = this.props;

    const {
      name,
      profilePhotoURL,
    } = this.state;

    return (
      <Shell
        title="New Person of Interest"
        iconElementLeft={<KeyboardArrowLeftIcon />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <ImageInput
            onAddImage={this.onAddImage}
            onRemoveImage={this.onRemoveImage}
            placeholder={<IconButton><AddPhotoIcon color={'rgba(0,0,0,0.3)'}/></IconButton>}
            imagePreviewURL={profilePhotoURL}
            width={150}
            height={150}
          />
        </div>
        <TextField
          onChange={(event) => { this.onTextFieldChange('name', event); }}
          floatingLabelText="Name"
          fullWidth={true}
          value={name}
        />
        <FloatingSaveButton onClick={this.savePerson}/>
      </Shell>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewPerson);
