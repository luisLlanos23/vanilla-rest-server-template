module.exports = (response, req, res, next) => {
  let responseStatus = response.status;
  responseStatus = response.error ? response.error.status || 500 : null;
  responseStatus = responseStatus || 200;
  delete response.status;

  const responseSchema = response.error
    ? {
        error   : true,
        code    : response.error.code || undefined,
        message : response.error.message || undefined,
      }
    : response.result || response;

  res.status(responseStatus).json(responseSchema);
};
