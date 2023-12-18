import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getImage from '@wasp/queries/getImage';

export function HomePage() {
  const { data: image, isLoading, error } = useQuery(getImage, { imageId: 1 });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>My Images</h1>
      {image && (
        <div className='flex flex-wrap gap-4'>
          {image.ImageFeature.map((feature) => (
            <div
              key={feature.id}
              className='bg-gray-100 p-4 rounded-lg'
            >
              <img src={feature.url} alt={feature.name} className='w-full h-48 object-cover rounded-lg mb-2' />
              <p className='font-bold'>{feature.name}</p>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      )}
      <Link to='/features' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Go to Features</Link>
    </div>
  );
}