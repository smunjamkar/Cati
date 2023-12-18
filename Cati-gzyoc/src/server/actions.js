import HttpError from '@wasp/core/HttpError.js'

export const createImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const image = await context.entities.Image.create({
    data: {
      url: args.url,
      userId: context.user.id
    }
  });

  return image;
}

export const associateFeatureToImage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { imageId, featureId } = args;

  const image = await context.entities.Image.findUnique({
    where: { id: imageId }
  });
  const feature = await context.entities.Feature.findUnique({
    where: { id: featureId }
  });

  if (!image || !feature) { throw new HttpError(404) };

  return context.entities.ImageFeature.create({
    data: {
      image: { connect: { id: imageId } },
      feature: { connect: { id: featureId } }
    }
  });
}