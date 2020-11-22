import * as types from './constants';

export const auth = payload => ({
    type: types.AUTH, payload
  });
  
  export const authFailed = payload => ({
    type: types.AUTH_FAILED, payload
  });
  
  export const authSuccess = (payload) => ({
    type: types.AUTH_SUCCESS, payload
  });