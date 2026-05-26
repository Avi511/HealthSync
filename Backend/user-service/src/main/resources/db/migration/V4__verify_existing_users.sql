-- Verify all existing users that were registered before OTP enforcement
UPDATE users SET is_verified = TRUE;
