-- 1. Chamados com categoria e solicitante.
SELECT t.id, t.title, t.status, t.priority, c.name AS category, u.email AS created_by
FROM tickets t
JOIN categories c ON c.id = t."categoryId"
JOIN users u ON u.id = t."createdById"
ORDER BY t.id;

-- 2. Chamados por responsavel.
SELECT u.name, u.email, t.title, t.status
FROM ticket_assignments ta
JOIN users u ON u.id = ta."userId"
JOIN tickets t ON t.id = ta."ticketId"
ORDER BY u.name, t.id;

-- 3. Quantidade de chamados por status.
SELECT status, COUNT(*) AS total
FROM tickets
GROUP BY status
ORDER BY total DESC;

-- 4. Chamados de alta prioridade abertos ou em andamento.
SELECT id, title, status, priority, "createdAt"
FROM tickets
WHERE priority = 'high' AND status IN ('open', 'in_progress')
ORDER BY "createdAt" DESC;

-- 5. Categorias com mais chamados.
SELECT c.name, COUNT(t.id) AS total
FROM categories c
LEFT JOIN tickets t ON t."categoryId" = c.id
GROUP BY c.id, c.name
ORDER BY total DESC;
