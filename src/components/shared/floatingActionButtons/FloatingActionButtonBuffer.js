import React from 'react';

import { floatingActionButtonTopFromBottom } from 'settings/style';

// a buffer to be placed on the bottom of screens with FloatingActionButtons so that components can be scrolled above the FAB
const FloatingActionButtonBuffer = (props) => {
    return (
        <div style={{ height: `${floatingActionButtonTopFromBottom}px`, width: '100vw' }}></div>
    );
}

export default FloatingActionButtonBuffer;
