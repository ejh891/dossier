
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import uuidv4 from 'uuid/v4';

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropzoneRef: null,
    };

    this.onAddImage = this.onAddImage.bind(this);
  }

  onAddImage(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length !== 1) {
      throw new Error('Only one image can be added')
    }

    const file = acceptedFiles[0];

    this.props.onAddImage(file);
  }

  render() {
    const {
      placeholder,
      imagePreviewURL,
      height,
      width,
    } = this.props;

    const wrapperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height, width };

    if (!imagePreviewURL) {
      return (
        <Dropzone
          ref={(node) => { this.dropzoneRef = node; }}
          accept="image/jpeg, image/png"
          multiple={false} // only 1 file at a time
          onDrop={this.onAddImage}
          style={{
            ...wrapperStyle,
            border: '1px dashed rgba(0,0,0,0.3)',
          }}
        >
          {placeholder}
        </Dropzone>
      );
    } else {
      return (
        <div style={wrapperStyle}>
          <img src={imagePreviewURL} alt="File input preview" style={{ maxHeight: height, maxWidth: width }} />
        </div>
      );
    }
  }

}

export default ImageInput;
