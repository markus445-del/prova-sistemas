CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_category ON tickets("categoryId");
CREATE UNIQUE INDEX IF NOT EXISTS idx_ticket_assignments_unique
  ON ticket_assignments("ticketId", "userId");
