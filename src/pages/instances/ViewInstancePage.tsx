import { Alert, ButtonLink, Loader, Section, useInstance } from '@manifoldxyz/studio-app-sdk-react'
import { Link, useParams } from 'react-router-dom'
import { MyInstance } from 'src/components/MyInstance'
import { MyInstanceData } from 'src/types'

export function ViewInstancePage() {
  const params = useParams<{ id: string }>()
  const id = parseInt(params.id!)

  const { isLoading, error, data: instance } = useInstance<MyInstanceData>(id)

  return (
    <Section>
      <div className="flex mb-2">
        <div className="flex-auto">
          <Link to="/instances">← All</Link>
        </div>
        <ButtonLink variant="secondary" to={`/instances/${id}/edit`}>
          Edit
        </ButtonLink>
      </div>

      {isLoading && <Loader />}
      {error && <Alert type="error">{error.message}</Alert>}
      {instance && <MyInstance data={instance.data} />}
    </Section>
  )
}
