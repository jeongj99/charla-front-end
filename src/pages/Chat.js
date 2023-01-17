import React from 'react';
import { useParams } from 'react-router-dom';

export default function Chat() {
  const { id } = useParams();

  return (
    <div>This is Chat page and id is {id}</div>
  );
}