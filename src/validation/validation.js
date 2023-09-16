export const validate = (schema, request) => {
  const result = schema.validate(request, {
    allowUnknown: false,
    abortEarly: false,
  });
  if (result.error) {
    throw result.error;
  } else {
    return result;
  }
};
