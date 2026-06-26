const { User } = require('../models');

const userAttributes = ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'];

exports.list = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: userAttributes, order: [['id', 'ASC']] });
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: userAttributes });

    if (!user) {
      return res.status(404).json({ message: 'Usuario nao encontrado.' });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const created = await User.findByPk(user.id, { attributes: userAttributes });
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario nao encontrado.' });
    }

    await user.update(req.body);
    const updated = await User.findByPk(user.id, { attributes: userAttributes });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario nao encontrado.' });
    }

    await user.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
