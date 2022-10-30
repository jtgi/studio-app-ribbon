import { Section } from '@manifoldxyz/studio-app-sdk-react'
import { useLocation, useParams, useResolvedPath } from 'react-router-dom'

export function NotFoundPage() {
  const loc = useLocation();
  return (
    <Section>
      <h1 className='font-bold text-3xl'>404</h1>
      <p>{loc.pathname}</p>
    </Section>
  )
}
