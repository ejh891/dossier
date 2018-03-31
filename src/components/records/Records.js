import React from 'react';

import List  from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import RecordRow from './RecordRow';

export default (props) => {
  const {
    records,
    onDeleteRecordClick,
    onEditRecordClick,
  } = props;

  return (
      <List>
        <Subheader>Notes</Subheader>
        {records.map(record => {
          return (
            <RecordRow
              key={record._id}
              record={record}
              onDeleteClick={onDeleteRecordClick}
              onEditClick={onEditRecordClick}
            />
          );
        })}
      </List>
  );
}
