import React from 'react';

import { List }  from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

import RecordRow from './RecordRow';
import RecordFolderRow from './RecordFolderRow';

import FileSystem from 'lib/FileSystem';

export default (props) => {
  const {
    records,
    path = '/',
    onFolderClick,
    onDeleteRecordClick,
    onEditRecordClick,
  } = props;

  const fs = new FileSystem();

  for (const record of records) {
    fs.insert(record, record.path);
  }

  const root = fs.getTree(path);

  return (
    <div>
      {root.directories.length > 0 &&
        <div>
          <List>
            <Subheader>Folders</Subheader>
            {root.directories.map(directory => {
              return (
                <RecordFolderRow
                  key={directory.name}
                  directory={directory}
                  onClick={onFolderClick}
                />
              );
            })}
          </List>
          <Divider inset={true} />
        </div>
      }
      {root.files.length > 0 &&
        <List>
          <Subheader>Records</Subheader>
          {root.files.map(record => {
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
      }
    </div>
  );
}
