module.exports = {
  invalidFields(error, type) {
    return {
      code          : `INVALID_${type.toUpperCase()}_VALUE_CONTENT`,
      message       : error,
      status        : 400,
      isOperational : true,
    };
  },
};
