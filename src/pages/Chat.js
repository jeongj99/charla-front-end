import React from 'react';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const { id } = useParams();

  return (
    <>
      {id ? <div>This is chat page and id is {id}</div> : <div>This is chat page and there is no id</div>}
    </>
  );
}