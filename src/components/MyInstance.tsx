import { MyInstanceData } from 'src/types'

type MyInstanceProps = {
  data: MyInstanceData
}

export function MyInstance({ data: instanceData }: MyInstanceProps) {
  return (
    <div>
      <h2 className="text-2xl mb-1">{instanceData.name}</h2>
      <p>{instanceData.content}</p>
    </div>
  )
}
