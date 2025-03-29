const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
// Generate email verification token
function generateEmailVerificationToken() {
  return {
    token: uuidv4(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  };
}
// Generate password reset token
function generatePasswordResetToken() {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now
  };
}
module.exports = {
  generateEmailVerificationToken,
  generatePasswordResetToken
};