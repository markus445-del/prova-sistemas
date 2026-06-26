const { Category } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });
    return res.json(categories);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria nao encontrada.' });
    }

    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria nao encontrada.' });
    }

    await category.update(req.body);
    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Categoria nao encontrada.' });
    }

    await category.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
