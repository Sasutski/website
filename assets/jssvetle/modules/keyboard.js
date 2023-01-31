//imports get
import { get } from 'svelte/store';

//imports required commands for keyboard shortcuts
import {
  currentChannel,
  toggleSpace,
  incrementChannel,
  decrementChannel,
  toggleContent,
  gotoChannel,
  toggleFullscreen,
} from './tv.js';
import { body } from './utils.js';

//If the key is a HotKey
function isValidHotkey(e) {
  const activeEl = document.activeElement;

  return (
    activeEl === body ||
    activeEl == null ||
    ((activeEl.tagName === 'BUTTON' || activeEl.tagName === 'A') &&
      e.key !== 'Enter' &&
      e.key !== ' ')
  );
}

/*
If press 'k' Toggle on/off space
If press '+' or '=' the channel increases
If press '-' reduces channel number
If press 'h' Toggle on/off content
If press 'f' Toggle on/off Fullscreen
*/
function handleHotkey(e) {
  if (!isValidHotkey(e)) return;
  if (e.key === 'k') return toggleSpace();
  if (e.key === '+' || e.key === '=') return incrementChannel();
  if (e.key === '-') return decrementChannel();
  if (e.key === 'h') return toggleContent();
  if (e.key === 'f') return toggleFullscreen();
  /*
  Pressing 
  '1' switches to channel 1, 
  '2' switches to channel 2, 
  ...
  'n' switches to channel n
  */
  const channelNumber = Number(e.key);

  // ignore non-number keys
  if (Number.isNaN(channelNumber)) {
    return;
  }

  // toggle between a X channel and channel 0
  if (channelNumber === get(currentChannel)) {
    gotoChannel(0);
  } else {
    gotoChannel(channelNumber);
  }
}

export function initHotkeys() {
  window.addEventListener('keyup', handleHotkey);
}
