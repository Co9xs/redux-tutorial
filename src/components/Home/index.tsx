import { SerializedError } from "@reduxjs/toolkit";
import React, { useEffect, VFC } from "react";

interface Props {
  liffIdToken?: string,
  displayName?: string,
  pictureUrl?: string,
  error?: SerializedError,
  lineLogin: () => void,
  lineProfile: () => void
}

export const Home: VFC<Props> = (props: Props) => {
  const { liffIdToken, displayName, pictureUrl, error, lineLogin, lineProfile } = props
  useEffect(() => {
    if(!liffIdToken) {
      lineLogin()
    }
  }, [liffIdToken, lineLogin])

  useEffect(() => {
    if (liffIdToken) {
      lineProfile();
    }
  }, [liffIdToken, lineProfile]);

  if (error) {
    return (
      <div>
        <p>ERROR!</p>
      </div>
    );
  } else
    return (
      <div className="App">
        <header className="App-header">
          <img src={pictureUrl} alt="line profile" width="80" height="80" />
          <p>HELLO, {displayName}</p>
        </header>
      </div>
    );
 }