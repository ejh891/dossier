import React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { red300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";

import './bouncing.css';

export default (props) => {
    return (
        <FullScreenMessage
            message="Deleting..."
            icon={<DeleteIcon className="bouncing" style={{ height: 60, width: 60, translate: 'rotate(90deg)' }} color={red300} />}
        />
    );
}
