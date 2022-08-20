import { Section } from '@manifoldxyz/studio-app-sdk-react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <Section className="flex h-screen max-h-[500px]">
      <div className="m-auto">
        <h1 className="text-8xl font-bold animate-[bounce_1s_ease-in_2_forwards]">gm!</h1>
        <hr className="my-10 w-1/2 m-auto" />
        <ul className="text-center">
          <li>
            <Link to="/instances">Instance Demo →</Link>
          </li>
          <li>
            <a target="_blank" rel="noreferrer" href="https://docs.manifold.xyz/v/manifold-studio-apps/">
              Docs →
            </a>
          </li>
        </ul>
      </div>
    </Section>
  )
}
