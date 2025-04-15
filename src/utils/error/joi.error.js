module.exports = {
  unevaluatedFields: (type) => {
    const field = type && typeof (type) === 'string' ? type.toUpperCase() : String(type).toUpperCase();

    return {
      code    : `UNVALIDATED_${field}_CONTENT`,
      message : `Incoming <${field}> data in not being validated`,
      handled : true,
    };
  },

  invalidFields: (error, type) => {
    const field = type && typeof (type) === 'string' ? type.toUpperCase() : String(type).toUpperCase();

    return {
      code    : `INVALID_${field}_VALUE_CONTENT`,
      message : error && error.message ? error.message : 'The request have unvalidated data',
      handled : true,
    };
  },
};
