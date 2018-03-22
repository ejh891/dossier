import React from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import { red300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";

import './bouncing.css';

export default (props) => {
    return (
        <FullScreenMessage
            message="Shredding..."
            icon={<Delete className="bouncing" style={{ height: 60, width: 60 }} color={red300} />}
        />
    );
}
