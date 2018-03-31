import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';

import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { red300, blue300 } from 'material-ui/styles/colors';

export default (props) => {
    const {
        record,
        onClick,
        showMoreOptions = true,
        onDeleteClick,
        onEditClick,
    } = props;

    let moreOptionsIconMenu = null;
    if (showMoreOptions) {
      moreOptionsIconMenu = (
        <IconMenu
          style={{ paddingTop: 0 }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
          useLayerForClickAway={true} // the popover will render on top of an invisible layer, which will prevent clicks to the underlying elements
        >
          <MenuItem
            primaryText={`Edit ${record.title}`}
            leftIcon={<ModeEditIcon color={blue300} />}
            onClick={() => { onEditClick(record._id); }}
          />
          <MenuItem
            primaryText={`Delete ${record.title}`}
            leftIcon={<DeleteIcon color={red300} />}
            onClick={() => { onDeleteClick(record._id); }}
          />
        </IconMenu>
      );
    }

    return (
      <ListItem>
        <Card onClick={onClick}>
          <CardHeader
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            title={record.title}
            titleStyle={{ fontSize: '16pt' }}
            children={moreOptionsIconMenu}
          />
          {record.imageURL &&
            <CardMedia
              mediaStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <img src={record.imageURL} alt="" style={{ minWidth: 'unset', width: 'unset'}}/>
            </CardMedia>
          }
          <CardText>
            {record.notes}
          </CardText>
        </Card>
      </ListItem>
    );
}
