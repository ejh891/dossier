import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import { red300, blue300 } from 'material-ui/styles/colors';

const RecordMenu = (props) => {
  const {
    open,
    onRequestClose,
    onEditClick,
    onDeleteClick,
    anchorEl,
    targetRecord,
  } = props;

  if (!open) {
    return null;
  }

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
      targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
      onRequestClose={onRequestClose}
    >
      <Menu>
        <MenuItem
          primaryText={`Edit ${targetRecord.key}`}
          leftIcon={<ModeEdit color={blue300} />}
          onClick={() => { onEditClick(targetRecord._id); }}/>
        <MenuItem 
          primaryText={`Shred ${targetRecord.key}`}
          leftIcon={<Delete color={red300} />}
          onClick={() => { onDeleteClick(targetRecord._id); }} />
      </Menu>
    </Popover>
  )
}

export default RecordMenu;
