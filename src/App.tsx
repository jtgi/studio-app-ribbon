import './index.css'

import { StudioAppProvider } from '@manifoldxyz/studio-app-sdk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Writer } from './pages/Writer'
import { QueryClient, QueryClientProvider } from 'react-query';

const query = new QueryClient();

export function App() {
  return (
    <StudioAppProvider>
      <QueryClientProvider client={query}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Writer />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StudioAppProvider>
  )
}
