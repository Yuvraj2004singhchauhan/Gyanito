export const Error404 = (req, res, next) => { // Custom Middleware
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
}