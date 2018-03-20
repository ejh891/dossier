import React from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';

export default (props) => {
    const {
        name,
        records,
        onClick,
    } = props;

    return (
        <ListItem
            leftAvatar={<Avatar icon={<FileFolder />} />}
            primaryText={name}
            secondaryText={`${records.length} record(s)`}
            onClick={() => { onClick(name, records); }}
        />
    )
}