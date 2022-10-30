import './index.css'

import { StudioAppProvider } from '@manifoldxyz/studio-app-sdk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { EditMemo } from './pages/EditMemo';
import { MemoLayout } from './layouts/MemoLayout';
import { NewMemo } from './pages/NewMemo';
import { NotFoundPage } from './pages/NotFoundPage';
import { MemoList } from './pages/MemoList';

const query = new QueryClient();

export function App() {
  return (
    <StudioAppProvider>
      <QueryClientProvider client={query}>
        <BrowserRouter>
          <Routes>
            {/* <Route index element={<LoadDraftOrNewMemo />} /> */}
            <Route path="/memos" element={<MemoList />} />
            <Route path="/memo/new" element={<NewMemo />} />
            <Route path="/memo" element={<MemoLayout />}>
              <Route path="/memo/:id/edit" element={<EditMemo />} />
              {/* <Route path="/memo/:id" element={<ShowMemo />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StudioAppProvider>
  )
}
