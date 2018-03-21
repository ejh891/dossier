import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import * as personActions from 'redux/actions/personActions';
import Shell from 'components/shared/Shell';
import FloatingSaveButton from 'components/shared/floatingActionButtons/FloatingSaveButton';

class NewPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.textFieldOnChange = this.textFieldOnChange.bind(this);
    this.savePerson = this.savePerson.bind(this);
  }

  textFieldOnChange(field, event) {
    this.setState({
      [field]: event.target.value
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
        iconElementLeft={<KeyboardArrowLeft />}
        onLeftIconButtonClick={history.goBack}
      >
        <TextField
          onChange={(event) => { this.textFieldOnChange('name', event); }}
          floatingLabelText="Name"
          fullWidth={true}
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
