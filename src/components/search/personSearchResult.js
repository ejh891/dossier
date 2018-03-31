import React from 'react';

import ListItem from 'material-ui/List/ListItem';

import PersonAvatar from 'components/shared/PersonAvatar';

const formatSearchMatch = (person, searchMatch) => {
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
                            key={`${person._id}_searchMatch_${i}`}
                            style={{ fontWeight: 'bolder' }}
                        >
                            {character}
                        </span>
                    );
                } else {
                    return (
                        <span
                            key={`${person._id}_searchMatch_${i}`}
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
        searchMatch,
        onClick
    } = props;

    const highlightedText = formatSearchMatch(person, searchMatch);

    return (
      <ListItem
        onClick={onClick}
        leftAvatar={<PersonAvatar person={person} />}
        primaryText={highlightedText}
      />
    );
}
