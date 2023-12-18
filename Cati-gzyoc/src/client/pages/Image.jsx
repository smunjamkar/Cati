import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getImage from '@wasp/queries/getImage';
import associateFeatureToImage from '@wasp/actions/associateFeatureToImage';

export function Image() {
  const { imageId } = useParams();
  const { data: image, isLoading, error } = useQuery(getImage, { imageId });
  const associateFeatureToImageFn = useAction(associateFeatureToImage);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAssociateFeature = (featureId) => {
    associateFeatureToImageFn({ imageId, featureId });
  };

  return (
    <div className='p-4'>
      <img src={image.url} alt='Image' className='mb-4 rounded-lg' />
      <div className='grid grid-cols-3 gap-4'>
        {image.ImageFeature.map((imageFeature) => (
          <div
            key={imageFeature.id}
            className='flex items-center justify-between bg-gray-100 p-4 rounded-lg'
          >
            <div>{imageFeature.feature.name}</div>
            <div>
              <button
                onClick={() => handleAssociateFeature(imageFeature.feature.id)}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
              >
                Associate
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to='/features' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Back to Features</Link>
    </div>
  );
}