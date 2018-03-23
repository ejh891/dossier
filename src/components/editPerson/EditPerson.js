import React, { Component } from 'react';

import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import Shell from 'components/shared/Shell';
import FeatureInProgress from "components/shared/fullScreenMessage/FeatureInProgress";

class EditPerson extends Component {
  render() {
    const {
      history,
    } = this.props;

    return (
      <Shell
        iconElementLeft={<KeyboardArrowLeftIcon />}
        onLeftIconButtonClick={() => { history.goBack(); }}
      >
        <FeatureInProgress />
      </Shell>
    );
  }
}

export default EditPerson;
