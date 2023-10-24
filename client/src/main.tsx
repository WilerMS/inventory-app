import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from '@/redux/store'
import './index.css'
import { HeaderProvider } from './features/header/HeaderContext.tsx'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HeaderProvider>
          <App />
        </HeaderProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
