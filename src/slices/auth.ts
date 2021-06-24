import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import liff from "@line/liff"

const liffId = process.env.REACT_APP_LIFF_ID

export interface AuthState {
  liffIdToken?: string;
  userId?: string;
  displayName?: string;
  pictureUrl?: string;
  statusMessage?: string;
  error?: SerializedError
}

const initialState: AuthState = {
  liffIdToken: undefined,
  userId: undefined,
  displayName: undefined,
  pictureUrl: undefined,
  statusMessage: undefined,
  error: undefined
}

interface LiffIdToken {
  liffIdToken?: string;
}

interface LINEProfile {
  userId?: string;
  displayName?: string;
  pictureUrl?: string;
  statusMessage?: string
}

export const getLiffIdToken = createAsyncThunk<LiffIdToken>(
  "liffIdToken/fetch",
  async (): Promise<LiffIdToken> => {
    if (!liffId) {
      throw new Error("liffId is not defined")
    }
    await liff.init({liffId})
    if (!liff.isLoggedIn()) {
      liff.login()
    }
    const liffIdToken = liff.getIDToken()
    if (liffIdToken) {
      return { liffIdToken } as LiffIdToken
    }
    throw new Error("LINE login error")
  }
)

export const getLINEProfile = createAsyncThunk<LINEProfile>(
  "lineProfile/fetch",
  async (): Promise<LINEProfile> => {
    const lineProfile = liff.getProfile()
    if (lineProfile) {
      return lineProfile as LINEProfile
    }
    throw new Error("LINE profile data fetch error")
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLiffIdToken.fulfilled, (state, action) => {
      state.liffIdToken = action.payload.liffIdToken
    })
    builder.addCase(getLiffIdToken.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(getLINEProfile.fulfilled, (state, action) => {
      state.userId = action.payload.userId
      state.displayName = action.payload.displayName
      state.pictureUrl = action.payload.pictureUrl
      state.statusMessage = action.payload.pictureUrl
    })
    builder.addCase(getLINEProfile.rejected, (state, action) => {
      state.error = action.error
    })
  }
})