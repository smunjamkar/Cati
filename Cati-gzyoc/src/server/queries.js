import HttpError from '@wasp/core/HttpError.js'

export const getImage = async ({ imageId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const image = await context.entities.Image.findUnique({
    where: { id: imageId },
    include: { ImageFeature: true },
  });

  if (!image) { throw new HttpError(404, 'No image with id ' + imageId) }

  if (image.userId !== context.user.id) { throw new HttpError(403) }

  return image;
}

export const getAllFeatures = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Feature.findMany();
}