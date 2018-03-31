import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Dropzone from 'react-dropzone';
import FlatButton from 'material-ui/FlatButton'
import * as personActions from 'redux/actions/personActions';
import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';

class NewPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      file: null,
      preview: null,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.onAddPhoto = this.onAddPhoto.bind(this);
    this.savePerson = this.savePerson.bind(this);
  }

  onTextFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  onAddPhoto(event, file) {
    this.setState({
      file: file
    });
  }

  async savePerson() {
    const {
      history,
    } = this.props;

    const person = {
      name: this.state.name
    };

    await this.props.personActions.addPerson(person);

    history.goBack();
  }

  render() {
    const {
      history,
    } = this.props;

    return (
      <Shell
        title="New Person of Interest"
        iconElementLeft={<KeyboardArrowLeftIcon />}
        onLeftIconButtonClick={history.goBack}
      >
        <TextField
          onChange={(event) => { this.onTextFieldChange('name', event); }}
          floatingLabelText="Name"
          fullWidth={true}
        />

        <Dropzone
          accept="image/jpeg, image/png"
          multiple={false} // only 1 file at a time
          style={{ border: 'none' }}
          onDrop={(acceptedFiles, rejectedFiles) => {
            acceptedFiles.forEach(file => {
              const reader = new FileReader();
                reader.onload = () => {
                  this.setState({
                    file: {
                      preview: file.preview,
                      binaryString: reader.result,
                    }
                  });
                };
                reader.onabort = () => console.log('file reading was aborted');
                reader.onerror = () => console.log('file reading has failed');

                reader.readAsBinaryString(file);
              });
          }}
        >
        <FlatButton
          label="Choose an Image"
          labelPosition="before"
          containerElement="label"
        >
        </FlatButton>
        </Dropzone>
        <img src={this.state.file.preview} />
        <FloatingSaveButton onClick={this.savePerson}/>
      </Shell>
    );
  }

  componentWillUnmount() {
    if (this.state.file) {
      // avoid memory leaks by revoking object URL
      // ref: https://react-dropzone.js.org/
      window.URL.revokeObjectURL(this.state.file.preview);
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    personActions: bindActionCreators(personActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(NewPerson);
