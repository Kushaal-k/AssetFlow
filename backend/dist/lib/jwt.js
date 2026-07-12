import jwt from 'jsonwebtoken';
const TOKEN_EXPIRY = '7d';
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET environment variable is required');
    return secret;
}
export function signToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
}
export function verifyToken(token) {
    return jwt.verify(token, getJwtSecret());
}
//# sourceMappingURL=jwt.js.map