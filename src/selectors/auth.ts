import { createSelector } from "reselect"
import { RootState } from "../store"

export const authSelector = (state: RootState) => state.auth

export const liffIdTokenSelector = createSelector(authSelector, (auth) => {
  return auth.liffIdToken
})

export const displayNameSelector = createSelector(authSelector, (auth) => {
  return auth.displayName
})

export const pictureUrlSelector = createSelector(authSelector, (auth) => {
  return auth.pictureUrl
})

export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});