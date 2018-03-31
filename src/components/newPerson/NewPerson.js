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
      imageFile: null,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
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
    };

    const profilePhotoFile = this.state.imageFile;

    await this.props.personActions.addPerson(person, profilePhotoFile);

    history.goBack();
  }

  onAddImage(imageFile) {
    this.setState({
      imageFile,
    })
  }

  onRemoveImage() {
    if (this.state.imageFile) {
      this.releaseFileURL(this.state.imageFile.preview);

      this.setState({
        imageFile: null
      });
    }
  }

  releaseFileURL(url) {
    // avoid memory leaks by revoking object URL
    // ref: https://react-dropzone.js.org/
    window.URL.revokeObjectURL(url);
  }

  render() {
    const {
      history,
    } = this.props;

    const {
      imageFile
    } = this.state;

    const imagePreviewURL = imageFile ? imageFile.preview : null;

    return (
      <Shell
        title="New Person of Interest"
        iconElementLeft={<KeyboardArrowLeftIcon />}
        onLeftIconButtonClick={history.goBack}
      >
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20 }}>
          <ImageInput
            onAddImage={this.onAddImage}
            placeholder={<IconButton><AddPhotoIcon color={'rgba(0,0,0,0.3)'}/></IconButton>}
            imagePreviewURL={imagePreviewURL}
            width={150}
            height={150}
          />
        </div>
        <TextField
          onChange={(event) => { this.onTextFieldChange('name', event); }}
          floatingLabelText="Name"
          fullWidth={true}
        />
        <FloatingSaveButton onClick={this.savePerson}/>
      </Shell>
    );
  }

  componentWillUnmount() {
    if (this.state.imageFile) {
      this.releaseFileURL(this.state.imageFile.preview);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewPerson);
