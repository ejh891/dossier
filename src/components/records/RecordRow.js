import React from 'react';
import { Holdable } from 'react-touch';

import { blue300 } from 'material-ui/styles/colors';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Description from 'material-ui/svg-icons/action/description';

export default (props) => {
    const {
        record,
        onHold,
    } = props;

    let ref;
    return (
      <Holdable onHoldComplete={(event) => { onHold(event, record); }}>
        <ListItem
          key={record._id}
          leftAvatar={<Avatar icon={<Description />} backgroundColor={blue300} />}
          primaryText={record.key}
          secondaryText={record.value}
        />   
      </Holdable>
    );
}
