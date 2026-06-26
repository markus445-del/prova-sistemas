const { User } = require('../models');
const authService = require('../services/authService');

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findUserByEmail(email);

    if (!user || !(await authService.verifyPassword(password, user.password))) {
      return res.status(401).json({ message: 'Email ou senha invalidos.' });
    }

    const token = authService.generateToken(user);

    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    return res.status(201).json(sanitizeUser(user));
  } catch (error) {
    return next(error);
  }
};
