import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import groupBy from 'lodash.groupby';

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

import RecordFolder from './RecordFolder';

class Records extends Component {
  render() {
    const {
      records,
      path = '/',
      onFolderClick,
    } = this.props;

    // files in this directory
    const files = records.filter(record => record.path === path);
    
    // files *not* in this directory
    const subFiles = records.filter(record => record.path !== path);

    const folders = groupBy(subFiles, 'path');
    const folderNames = Object.keys(folders);

    return (
      <div>
        {folderNames.length > 0 &&
          <div>
            <List>
              <Subheader>Folders</Subheader>
              {folderNames.map(folderName => {
                return (
                  <RecordFolder
                    key={folderName}
                    name={folderName}
                    records={folders[folderName]}
                    onClick={onFolderClick}
                  />
                );
              })}
            </List>
            <Divider inset={true} />
          </div>
        }
        {files.length > 0 &&
          <List>
            <Subheader>Records</Subheader>
            {files.map(record => {
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
