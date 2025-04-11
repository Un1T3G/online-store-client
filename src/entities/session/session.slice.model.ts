import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SessionSliceState } from './session.types'

const initialState: SessionSliceState = {
  isAuth: false,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { reducer: sessionReducer, actions: sessionActions } = sessionSlice
