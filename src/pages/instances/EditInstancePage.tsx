import { Alert, Loader, Section, useInstance, useUpdateInstance } from '@manifoldxyz/studio-app-sdk-react'
import { Link, useParams } from 'react-router-dom'
import { MyInstanceForm } from 'src/components/MyInstanceForm'
import { MyInstanceData } from 'src/types'

export function EditInstancePage() {
  const params = useParams<{ id: string }>()
  const id = parseInt(params.id!)

  const instance = useInstance<MyInstanceData>(id)
  const updateInstance = useUpdateInstance<MyInstanceData>()

  const isLoading = instance.isLoading || updateInstance.isLoading
  const error = instance.error || updateInstance.error

  const onUpdate = (instanceData: MyInstanceData) => {
    return updateInstance.mutateAsync({ id, data: instanceData })
  }

  return (
    <Section>
      <div className="mb-2">
        <Link to="/instances">← All</Link>
      </div>

      {isLoading && <Loader />}
      {error && <Alert type="error">{error.message}</Alert>}

      {instance.data && <MyInstanceForm initialValue={instance.data.data} onSubmit={onUpdate} />}
    </Section>
  )
}
