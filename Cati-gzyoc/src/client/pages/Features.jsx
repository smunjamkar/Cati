import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getAllFeatures from '@wasp/queries/getAllFeatures';

export function Features() {
  const { data: features, isLoading, error } = useQuery(getAllFeatures);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {features.map((feature) => (
        <div
          key={feature.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{feature.name}</div>
          <div>{feature.description}</div>
        </div>
      ))}
      <Link to='/'>Go back to home</Link>
    </div>
  );
}