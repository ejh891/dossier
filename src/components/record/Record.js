import React, { Component } from 'react';

import Shell from 'components/shared/Shell';

class Record extends Component {
  render() {
    return (
      <Shell>
        <div>Person {this.props.match.params.personId} Record {this.props.match.params.recordId}</div>
      </Shell>
    );
  }
}

export default Record;
