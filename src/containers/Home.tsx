import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { Home } from "../components/Home";
import { getLiffIdToken, getLINEProfile } from "../slices/auth";
import {
  displayNameSelector,
  errorSelector,
  liffIdTokenSelector,
  pictureUrlSelector,
} from "../selectors/auth";

export const HomeContainer: FC = () => {
  const dispatch = useDispatch();
  const liffIdToken = useSelector(liffIdTokenSelector);
  const displayName = useSelector(displayNameSelector);
  const pictureUrl = useSelector(pictureUrlSelector);
  const error = useSelector(errorSelector);
  const lineLogin = useCallback(() => {
    dispatch(getLiffIdToken());
  }, [dispatch]);
  const lineProfile = useCallback(() => {
    dispatch(getLINEProfile());
  }, [dispatch]);

  return (
    <Home
      liffIdToken={liffIdToken}
      displayName={displayName}
      pictureUrl={pictureUrl}
      lineLogin={lineLogin}
      lineProfile={lineProfile}
      error={error}
    />
  );
};