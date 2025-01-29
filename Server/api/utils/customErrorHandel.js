// ******************************
// custom error handeling
// ******************************
export const customErrorHandel = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
