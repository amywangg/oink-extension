import * as types from "./constants";

export const auth = (payload) => ({
  type: types.AUTH,
  payload,
});

export const authFailure = (payload) => ({
  type: types.AUTH_FAILURE,
  payload,
});

export const authSuccess = (payload) => ({
  type: types.AUTH_SUCCESS,
  payload,
});

export const getBudget = (payload) => ({
  type: types.GET_BUDGET,
  payload,
});

export const budgetFailure = (payload) => ({
  type: types.GET_BUDGET_FAILURE,
  payload,
});

export const budgetSuccess = (payload) => ({
  type: types.GET_BUDGET_SUCCESS,
  payload,
});
