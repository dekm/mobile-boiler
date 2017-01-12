'use strict';
export const SIDEMENU_TOGGLE = 'SIDEMENU_TOGGLE'
export const SIDEMENU_OPEN = 'SIDEMENU_OPEN'
export const SIDEMENU_CLOSE = 'SIDEMENU_CLOSE'

export function toggle() {
  return {
    type: SIDEMENU_TOGGLE
  }
}

export function open() {
  return {
    type: SIDEMENU_OPEN
  }
}

export function close() {
  return {
    type: SIDEMENU_CLOSE
  }
}
