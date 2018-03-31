
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { red300 } from 'material-ui/styles/colors';
import FirebaseService from 'services/FirebaseService';

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropzoneRef: null,
    };

    this.onAddImage = this.onAddImage.bind(this);
  }

  async onAddImage(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length !== 1) {
      throw new Error('Only one image can be added')
    }

    const file = acceptedFiles[0];
    // avoid memory leaks by revoking object URL (we revoke immediately since we're not using the preview)
    // ref: https://react-dropzone.js.org/
    window.URL.revokeObjectURL(file.preview);

    const url = await FirebaseService.upload(file);

    this.props.onAddImage(url);
  }

  render() {
    const {
      placeholder,
      imagePreviewURL,
      onRemoveImage,
      height,
      width,
    } = this.props;

    const wrapperStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px dashed rgba(0,0,0,0.3)',
      height,
      width
    };

    if (!imagePreviewURL) {
      return (
        <Dropzone
          ref={(node) => { this.dropzoneRef = node; }}
          accept="image/jpeg, image/png"
          multiple={false} // only 1 file at a time
          onDrop={this.onAddImage}
          style={wrapperStyle}
        >
          {placeholder}
        </Dropzone>
      );
    } else {
      return (
        <div style={{
            ...wrapperStyle,
            position: 'relative'
          }}
        >
          <FloatingActionButton
            mini={true}
            backgroundColor={red300}
            style={{ position: 'absolute', top: -15, right: -15 }}
            onClick={onRemoveImage}
          >
            <ClearIcon/>
          </FloatingActionButton>
          <img src={imagePreviewURL} alt="File input preview" style={{ maxHeight: height, maxWidth: width }} />
        </div>
      );
    }
  }

}

export default ImageInput;
