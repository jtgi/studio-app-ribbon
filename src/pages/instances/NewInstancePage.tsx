import { Alert, Loader, Section, useCreateInstance } from '@manifoldxyz/studio-app-sdk-react'
import { useNavigate } from 'react-router'
import { MyInstanceForm } from 'src/components/MyInstanceForm'
import { MyInstanceData } from 'src/types'

export function NewInstancePage() {
  const navigate = useNavigate()
  const { isLoading, error, mutateAsync: create } = useCreateInstance<MyInstanceData>()

  const onSubmit = async (instanceData: MyInstanceData) => {
    const { id } = await create({ data: instanceData })
    navigate(`/instances/${id}`)
  }

  return (
    <Section>
      <h1 className="text-2xl font-bold mb-2">New Instance</h1>

      {isLoading && <Loader />}
      {error && <Alert type="error">{error.message}</Alert>}

      <MyInstanceForm
        onSubmit={onSubmit}
        initialValue={{
          name: '',
          content: ''
        }}
      />
    </Section>
  )
}
