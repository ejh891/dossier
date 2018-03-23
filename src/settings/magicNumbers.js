import { floatingActionButton } from 'components/shared/floatingActionButtons/floatingActionButtonStyles';

const bodyMargin = 8; // from app.css

const appBarHeight = 64; // found from inspecting dom

export const appBarBufferHeight = appBarHeight - bodyMargin;

// how far the top of a FAB will be from the bottom of the screen
// used to create a buffer on the bottom of the screen so that components can be scrolled above the FAB
export const floatingActionButtonBufferHeight = floatingActionButton.bottom + floatingActionButton.height - bodyMargin;
