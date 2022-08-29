import React from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./components/CKEditor5'), {
  ssr: false,
});

function ck5() {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default ck5;