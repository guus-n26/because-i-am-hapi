import React from 'react';
import { NormalizedCacheObject } from '@apollo/client';

export default function Html({
  content,
  state,
}: {
  content: string;
  state: NormalizedCacheObject;
}) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c',
            )};`,
          }}
        />
        <script type="module" src="/public/bundle.js" />
      </body>
    </html>
  );
}
