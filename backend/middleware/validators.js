/**
 * Input validation middleware for authentication routes
 */

export const validateLoginInput = (req, res, next) => {
  const { pi_signed_message } = req.body;

  if (!pi_signed_message) {
    return res.status(400).json({
      success: false,
      error: "pi_signed_message is required"
    });
  }

  if (typeof pi_signed_message !== "string") {
    return res.status(400).json({
      success: false,
      error: "pi_signed_message must be a string"
    });
  }

  next();
};

export const validateLogoutInput = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      error: "refreshToken is required"
    });
  }

  next();
};
