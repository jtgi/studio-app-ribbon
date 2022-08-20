import './index.css'

import { StudioAppProvider } from '@manifoldxyz/studio-app-sdk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from 'src/pages/HomePage'
import { EditInstancePage } from 'src/pages/instances/EditInstancePage'
import { InstancesPage } from 'src/pages/instances/InstancesPage'
import { NewInstancePage } from 'src/pages/instances/NewInstancePage'
import { ViewInstancePage } from 'src/pages/instances/ViewInstancePage'
import { NotFoundPage } from 'src/pages/NotFoundPage'

export function App() {
  return (
    <StudioAppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="instances/new" element={<NewInstancePage />} />
          <Route path="instances" element={<InstancesPage />} />
          <Route path="instances/:id" element={<ViewInstancePage />} />
          <Route path="instances/:id/edit" element={<EditInstancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </StudioAppProvider>
  )
}
