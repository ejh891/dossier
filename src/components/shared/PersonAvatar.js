import React from 'react';
import Avatar from 'material-ui/Avatar';
import { red300, orange300, yellow300, green300, blue300, purple300 } from 'material-ui/styles/colors';
import sample from 'lodash.sample';

const colors = [ red300, orange300, yellow300, green300, blue300, purple300 ];

const PersonAvatar = (props) => {
  const {
    person,
    size = 40,
    backgroundColor,
    style, // material-ui/ListItem passes a style prop to its LeftAvatar prop component
  } = props;

  if (person.profilePhotoURL && person.profilePhotoURL !== '') {
    return (<Avatar src={person.profilePhotoURL} size={size} style={style} />);
  } else {
    const nameParts = person.name.split(' ');
    const initials = nameParts
      .map(part => part.slice(0, 1).toUpperCase()) // get the first letter of each name part
      .reduce((acc, letter) => { return acc + letter; }, '') // reduce to a string
      .slice(0, 2); // take the first 2 letters

    return (<Avatar size={size} style={style} backgroundColor={backgroundColor || sample(colors)}>{initials}</Avatar>);
  }
}

export default PersonAvatar;
