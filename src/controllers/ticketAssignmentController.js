const { TicketAssignment, Ticket, User } = require('../models');

const include = [
  { model: Ticket, as: 'ticket' },
  { model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] },
];

exports.list = async (req, res, next) => {
  try {
    const assignments = await TicketAssignment.findAll({ include, order: [['id', 'ASC']] });
    return res.json(assignments);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const assignment = await TicketAssignment.findByPk(req.params.id, { include });

    if (!assignment) {
      return res.status(404).json({ message: 'Atribuicao nao encontrada.' });
    }

    return res.json(assignment);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const assignment = await TicketAssignment.create(req.body);
    const created = await TicketAssignment.findByPk(assignment.id, { include });
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const assignment = await TicketAssignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Atribuicao nao encontrada.' });
    }

    await assignment.update(req.body);
    const updated = await TicketAssignment.findByPk(assignment.id, { include });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const assignment = await TicketAssignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Atribuicao nao encontrada.' });
    }

    await assignment.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
