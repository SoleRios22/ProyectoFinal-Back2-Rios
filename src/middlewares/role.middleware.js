export const authorize = role => (req,res,next) =>
  req.user.role === role
    ? next()
    : res.status(403).json({ error:'Acceso denegado' });
