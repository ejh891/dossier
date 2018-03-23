import React from 'react';
import BuildIcon from 'material-ui/svg-icons/action/build';
import { green300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";

const FeatureInProgress = (props) => {
    return (
        <FullScreenMessage
            message="Feature in progress"
            icon={<BuildIcon style={{ height: 60, width: 60 }} color={green300} />}
        />
    );
}

export default FeatureInProgress;
