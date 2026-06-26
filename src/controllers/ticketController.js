const { Category, Ticket, User } = require('../models');

const ticketInclude = [
  { model: Category, as: 'category' },
  { model: User, as: 'createdBy', attributes: ['id', 'name', 'email', 'role'] },
  { model: User, as: 'assignees', attributes: ['id', 'name', 'email', 'role'], through: { attributes: ['assignedAt'] } },
];

exports.list = async (req, res, next) => {
  try {
    const tickets = await Ticket.findAll({ include: ticketInclude, order: [['id', 'ASC']] });
    return res.json(tickets);
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, { include: ticketInclude });

    if (!ticket) {
      return res.status(404).json({ message: 'Chamado nao encontrado.' });
    }

    return res.json(ticket);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const ticket = await Ticket.create({
      ...req.body,
      createdById: req.body.createdById || req.user.id,
    });
    const created = await Ticket.findByPk(ticket.id, { include: ticketInclude });
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Chamado nao encontrado.' });
    }

    await ticket.update(req.body);
    const updated = await Ticket.findByPk(ticket.id, { include: ticketInclude });
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Chamado nao encontrado.' });
    }

    await ticket.destroy();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
