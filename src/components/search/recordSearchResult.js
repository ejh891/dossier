import React from 'react';

import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import DescriptionIcon from 'material-ui/svg-icons/action/description';
import { blue300 } from 'material-ui/styles/colors';

const formatSearchMatch = (record, searchMatch) => {
    const characters = [...searchMatch.string];

    let boldMode = false;
    return (
        <div>
            {characters.map((character, i) => {
                if (character === '<') {
                    boldMode = true;
                    return null;
                }

                if (character === '>') {
                    boldMode = false;
                    return null;
                }

                if (boldMode) {
                    return (
                        <span
                            key={`${record._id}_searchMatch_${i}`}
                            style={{ fontWeight: 'bolder' }}
                        >
                            {character}
                        </span>
                    );
                } else {
                    return (
                        <span
                            key={`${record._id}_searchMatch_${i}`}
                        >
                            {character}
                        </span>
                    );
                }
            })}
        </div>
    )
}

export default (props) => {
    const {
        person,
        record,
        searchMatch,
        onClick
    } = props;

    const highlightedText = formatSearchMatch(record, searchMatch);

    return (
      <ListItem
        onClick={onClick}
        leftAvatar={<Avatar icon={<DescriptionIcon />} backgroundColor={blue300} />}
        primaryText={highlightedText}
        secondaryText={person.name}
      />   
    );
}
