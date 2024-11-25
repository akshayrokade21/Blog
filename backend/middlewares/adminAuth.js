export const adminAuth = (req, res, next) => {
    if (req.user.role == 1) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
