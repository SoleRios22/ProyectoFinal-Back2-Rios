import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

export default function configurePassport() {
  passport.use('current',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      const user = await User.findById(payload.sub).select('-password -lastPasswords');
      return user ? done(null, user) : done(null, false);
    })
  );
}
