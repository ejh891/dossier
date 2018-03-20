import React from 'react';
import Avatar from 'material-ui/Avatar';

export default (props) => {
  const {
    person,
    size = 40,
    style,
  } = props;

  // if avatar is an Avatar or other element, it will be rendered. If avatar is a string, it will be used as the image src for an Avatar.
  // ref: http://www.material-ui.com/#/components/card
  if (person.profilePhotoURL && person.profilePhotoURL !== '') {
    return (<Avatar src={person.profilePhotoURL} size={size} />);
  } else {
    const nameParts = person.name.split(' ');
    const initials = nameParts
      .map(part => part.slice(0, 1).toUpperCase()) // get the first letter of each name part
      .reduce((acc, letter) => { return acc + letter; }, '') // reduce to a string
      .slice(0, 2); // take the first 2 letters

    return (<Avatar size={size} style={style}>{initials}</Avatar>);
  }
}