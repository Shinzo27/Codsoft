export const generateToken = (user, message, stautsCode, res) => {
    const token = user.generateWebToken();
    const cookieName = user.role === "Admin" ? "AdminToken" : "CustomerToken"; 
    
    res
      .status(stautsCode)
      .cookie(cookieName, token, {
          httpOnly: true,
      })
      .json({
        success: true,
        message,
        username: user.username,
        token,
      });
};