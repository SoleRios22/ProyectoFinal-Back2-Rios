import passport from 'passport';

export const auth = passport.authenticate('current', { session:false });
