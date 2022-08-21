import { APIError } from '@manifoldxyz/studio-app-sdk';
import { Alert, Loader, Section, useCreator, useSDK } from '@manifoldxyz/studio-app-sdk-react'
import { nextTick } from 'process';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import SimpleMDE from "react-simplemde-editor";
import showdown from 'showdown';
import { themes } from 'src/themes';

import './writer.css'

type Post = {
  id?: string;
  body: string;
};

export function Writer() {
  const sdk = useSDK();
  const { address } = useCreator();
  const { data, setStorage } = useStorage('writer/draft', { body: '# ' });
  const [preview, setPreview] = useState<boolean>(false);

  const { isLoading, data: result, error, mutate: onPublish } = useMutation(
    ['publish'],
    async () => {
      const { id } = await sdk.createAsset();

      const html = toHTMLString({ theme: themes.retro, markdown: data.body });
      await sdk.uploadFile(id, new File([html], `${address}-post.html`, { type: 'text/html' }))
      return sdk.createJob({
        tasks: [{
          ref: 'arweave',
          name: 'Publish Post',
          description: 'Uploading your post to decentralized storage',
          type: 'arweave-upload',
          inputs: {
            assetId: id
          }
        }]
      });
    },
    {
      onSuccess: () => {
        setStorage({ body: '# ' })
      }
    }
  );

  const onChange = useCallback(
    (update: Partial<Post>) => setStorage({ ...data, ...update }),
    [setStorage, data]
  );

  const options = useMemo(() => ({
    autofocus: true,
    spellChecker: false,
    toolbar: ["bold", "italic", "heading", "|", "quote", "|", "link", "image"] as any,
    status: false
  }), []);

  if (preview) {
    return <HTMLPreview markdown={data.body} onClose={() => setPreview(false)} />;
  }

  return (
    <>
      {result && (<Alert className="p-5" type={'success'} title="Success!"> <a className="hover:underline" href={result.context.arweave.output.asset.files[0].arweaveURL} target="_blank" rel="noreferrer">View Post →</a></Alert>)}
      {error && (<Alert className="p-5" type={'error'} title="Uh oh.">{(error as APIError).message}</Alert>)}
      <Section className={`space-y-5 relative ${isLoading ? 'animate-pulse' : ''}`}>
        <Houdini to={0.1} from={1} className="absolute right-5 top-[25px] z-10" startDelay={2000} duration={'30s'}>
          <div className='flex'>
            <button
              className='p-2 pointer mr-5 animate border border-transparent rounded hover:black hover:underline'
              disabled={isLoading}
              onClick={() => setPreview(true)}
            >
              Preview
            </button>
            <button
              className='p-2 font-bold pointer mr-5 animate border border-transparent rounded hover:black hover:underline'
              disabled={isLoading}
              onClick={() => onPublish()}
            >
              Publish{isLoading && <Loader className="ml-2 -mt-1" size={15} />}
            </button>
          </div>
        </Houdini>

        <SimpleMDE
          options={options}
          value={data.body}
          onChange={body => onChange({ body: body || '' })}
          placeholder="..."
        />
      </Section>
    </>
  )
}


//utils
//TODO: too lazy to make files

function useStorage<T>(key: string, defaultValue: T) {
  const initialValue = useMemo(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue
  }, [key, defaultValue]);

  const [data, setData] = useState<T>(initialValue);

  const setStorage = useCallback((value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
    setData(value);
  }, [key]);

  return { data, setStorage };
}

export function HTMLPreview({ theme = themes.retro, markdown = '', onClose = () => { } }) {
  const html = useMemo(() => toHTMLString({ theme, markdown }), [theme, markdown]);

  useEffect(() => {
    nextTick(() => window.addEventListener('click', onClose))
    return () => window.removeEventListener('click', onClose)
  }, [onClose])

  return (
    <div className="absolute max-w-[900px] w-full h-full" dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function toHTMLString({ theme, markdown }: { theme: string, markdown: string }) {
  const content = new showdown.Converter().makeHtml(markdown);
  const html = `
  <html>
    <head>
    <style>${theme}</style>
    </head>
    <body>
      ${content}
    </body>
  </html>
  `
  return html;
}

function clx(...classes: Array<string | null | undefined>) {
  return classes.filter(Boolean).join(' ')
};

type HoudiniProps = {
  children: React.ReactElement;
  startDelay: number;
  duration: string;
  to: number;
  from: number;
} & React.HTMLAttributes<HTMLDivElement>;

// it was a cool idea but turned outmeh
function Houdini({ children, startDelay, duration, to, from, ...props }: HoudiniProps) {
  const [hide, setHide] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(true)
    }, startDelay)

    return () => clearTimeout(timeout);
  }, [startDelay]);

  return (
    <div
      onMouseEnter={() => setHide(false)}
      onMouseLeave={() => setHide(true)}
      style={hide ? { opacity: to, transition: `opacity ${duration}` } : { opacity: from, transition: 'opacity' }}
      className={clx(props.className)}>{children}</div>
  )
}
