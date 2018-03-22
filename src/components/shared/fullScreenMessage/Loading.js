import React from 'react';
import LoadingSpinner from 'material-ui/svg-icons/action/autorenew';
import { blue300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";

import './spinning.css';

export default (props) => {
    return (
        <FullScreenMessage
            message="Loading..."
            icon={<LoadingSpinner className="spinning" style={{ height: 60, width: 60 }} color={blue300} />}
        />
    );
}
