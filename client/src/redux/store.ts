import { configureStore } from '@reduxjs/toolkit'/*
import { filtersSlice, loginSlice } from '@/redux/features' */
import authReducer from '@/redux/features/authReducer'
import { authMiddleware } from './middlewares/authMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
