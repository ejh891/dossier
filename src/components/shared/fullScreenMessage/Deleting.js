import React from 'react';
import Gradient from 'material-ui/svg-icons/image/gradient';
import { red300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";

import './bouncing.css';

export default (props) => {
    return (
        <FullScreenMessage
            message="Shredding..."
            icon={<Gradient className="bouncing" style={{ height: 60, width: 60, translate: 'rotate(90deg)' }} color={red300} />}
        />
    );
}
