import { Button } from '@manifoldxyz/studio-app-sdk-react'
import React, { useState } from 'react'
import { MyInstanceData } from 'src/types'

type MyInstanceFormProps = {
  initialValue: MyInstanceData
  onSubmit(instanceData: MyInstanceData): void
}

export function MyInstanceForm({ initialValue, onSubmit }: MyInstanceFormProps) {
  const [instanceData, setInstanceData] = useState(initialValue)

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(instanceData)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInstanceData({
      ...instanceData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={submitForm}>
      <div className="space-y-4">
        <div>
          <label className="block" htmlFor="name">
            Name
          </label>
          <input name="name" type="text" value={instanceData.name} onChange={onChange} className="w-full" />
        </div>
        <div>
          <label className="block" htmlFor="content">
            Content
          </label>
          <textarea name="content" rows={10} value={instanceData.content} onChange={onChange} className="w-full" />
        </div>
        <Button variant="primary">Save</Button>
      </div>
    </form>
  )
}
