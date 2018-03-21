import React from 'react';
import ListItem from 'material-ui/List/ListItem';

import PersonAvatar from 'components/shared/PersonAvatar';

export default (props) => {
  const {
    person,
    onClick,
    rightIconButton,
  } = props;

  const numRecords = person.records.length;
  const subtitle = `${numRecords} record${numRecords === 1 ? '' : 's'} available`;

  return (
    <ListItem
      key={person._id}
      onClick={onClick}
      leftAvatar={<PersonAvatar person={person} style={{ marginRight: '10px' }} />}
      primaryText={person.name}
      secondaryText={subtitle}
      rightIconButton={rightIconButton}
    />
  );
}
