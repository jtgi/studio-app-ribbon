import { Instance } from '@manifoldxyz/studio-app-sdk'
import { Alert, ButtonLink, Loader, Section, useInstances } from '@manifoldxyz/studio-app-sdk-react'
import { Link } from 'react-router-dom'
import { MyInstance } from 'src/components/MyInstance'
import { MyInstanceData } from 'src/types'

export function InstancesPage() {
  const { isLoading, error, data: instances } = useInstances<MyInstanceData>()

  return (
    <Section>
      <div className="flex mb-2">
        <h1 className="flex-auto text-2xl font-bold">Your Instances</h1>
        <ButtonLink variant="primary" to="/instances/new">
          + New
        </ButtonLink>
      </div>

      {isLoading && <Loader />}
      {error && <Alert type="error">{error.message}</Alert>}

      {instances && (
        <div>
          {instances.map(({ id, data }: Instance<MyInstanceData>) => (
            <Link key={id} to={`/instances/${id}`} className="block py-2 border-b border-gray first:border-t hover:bg-gray-100 truncate">
              <MyInstance data={data} />
            </Link>
          ))}
        </div>
      )}
    </Section>
  )
}
