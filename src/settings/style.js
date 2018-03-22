export const appBarHeight = 70;
export const floatingActionButtonRight = 30;
export const floatingActionButtonBottom = 30;
const floatingActionButtonHeight = 56; // found from inspecting DOM

// how far the top of a FAB will be from the bottom of the screen
// used to create a buffer on the bottom of the screen so that components can be scrolled above the FAB
export const floatingActionButtonTopFromBottom = floatingActionButtonBottom + floatingActionButtonHeight;
