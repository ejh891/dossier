import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { red300, blue300 } from 'material-ui/styles/colors';

import PersonAvatar from 'components/shared/PersonAvatar';

export default (props) => {
  const {
    person,
    onClick,
    onDeleteClick,
    onEditClick,
  } = props;

  const nRecords = person.records.length;
  const subtitle = `${nRecords} record${nRecords === 1 ? '' : 's'}`;

  return (
    <ListItem
      key={person._id}
      onClick={onClick}
      leftAvatar={<PersonAvatar person={person} style={{ marginRight: '10px' }} />}
      primaryText={person.name}
      secondaryText={subtitle}
      rightIconButton={<IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
            useLayerForClickAway={true} // the popover will render on top of an invisible layer, which will prevent clicks to the underlying elements
          >
            <MenuItem
              primaryText={`Edit ${person.name}`}
              leftIcon={<ModeEditIcon color={blue300} />}
              onClick={() => { onEditClick(person._id); }}/>
            <MenuItem 
              primaryText={`Delete ${person.name}`}
              leftIcon={<DeleteIcon color={red300} />}
              onClick={() => { onDeleteClick(person._id); }} />
          </IconMenu>}
    />
  );
}
