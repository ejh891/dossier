import React from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import PersonAvatar from 'components/shared/PersonAvatar';

export default (props) => {
  const {
    person
  } = props;

  const numRecords = person.records.length;
  const subtitle = `${numRecords} record${numRecords === 1 ? '' : 's'} available`;

  return (
    <Card onClick={props.onClick}>
      <CardHeader
        title={person.name}
        avatar={<PersonAvatar person={person} style={{ marginRight: '10px' }}/>}
        subtitle={subtitle}
      />
    </Card>
  );
}
