import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import groupBy from 'lodash.groupby';

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

import RecordFolder from './RecordFolder';
import FileSystem from 'lib/FileSystem';

class Records extends Component {
  render() {
    const {
      records,
      path = '/',
      onFolderClick,
    } = this.props;

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
                  <RecordFolder
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
                <ListItem
                  key={record._id}
                  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                  primaryText={record.key}
                  secondaryText={record.value}
                />
              );
            })}
          </List>
        }
      </div>
    );
  }
}

export default Records;
