import { floatingActionButton } from 'components/shared/floatingActionButtons/floatingActionButtonStyles';

const bodyMargin = 8; // from app.css

export const appBarHeight = 70;

// how far the top of a FAB will be from the bottom of the screen
// used to create a buffer on the bottom of the screen so that components can be scrolled above the FAB
export const floatingActionButtonBufferHeight = floatingActionButton.bottom + floatingActionButton.height - bodyMargin;
