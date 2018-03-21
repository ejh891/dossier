import React from 'react';
import { yellow300 } from 'material-ui/styles/colors';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

export default (props) => {
    const {
        directory,
        onClick,
    } = props;

    return (
        <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={yellow300} />}
            primaryText={directory.name}
            secondaryText={`${directory.files.length} record(s)`}
            onClick={() => { onClick(directory); }}
        />
    )
}