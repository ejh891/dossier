import React from 'react';

import { floatingActionButtonBufferHeight } from 'settings/magicNumbers';

// a buffer to be placed on the bottom of screens with FloatingActionButtons so that components can be scrolled above the FAB
const FloatingActionButtonBuffer = (props) => {
    return (
        <div style={{ height: floatingActionButtonBufferHeight, width: '100vw' }}></div>
    );
}

export default FloatingActionButtonBuffer;
