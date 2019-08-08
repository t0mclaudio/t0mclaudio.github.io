/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import constants from '../constants';

export const Filter = (e) => ({
  type: constants.FILTER,
  payload: e,
});
