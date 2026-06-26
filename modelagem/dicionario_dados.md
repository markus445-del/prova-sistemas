# Dicionario de Dados

## users
| Campo | Tipo | Restricoes | Descricao |
| --- | --- | --- | --- |
| id | integer | PK, auto incremento | Identificador do usuario |
| name | varchar | not null | Nome do usuario |
| email | varchar | not null, unique | Email usado no login |
| password | varchar | not null | Senha criptografada com bcrypt |
| role | enum | admin, agent, requester | Perfil de acesso |

## categories
| Campo | Tipo | Restricoes | Descricao |
| --- | --- | --- | --- |
| id | integer | PK, auto incremento | Identificador da categoria |
| name | varchar | not null, unique | Nome da categoria |
| description | text | nullable | Descricao da categoria |

## tickets
| Campo | Tipo | Restricoes | Descricao |
| --- | --- | --- | --- |
| id | integer | PK, auto incremento | Identificador do chamado |
| title | varchar | not null | Titulo curto |
| description | text | not null | Descricao do problema |
| status | enum | open, in_progress, resolved, closed | Estado atual |
| priority | enum | low, medium, high | Prioridade |
| categoryId | integer | FK categories.id | Categoria do chamado |
| createdById | integer | FK users.id | Usuario que abriu o chamado |

## ticket_assignments
| Campo | Tipo | Restricoes | Descricao |
| --- | --- | --- | --- |
| id | integer | PK, auto incremento | Identificador da atribuicao |
| ticketId | integer | FK tickets.id | Chamado atribuido |
| userId | integer | FK users.id | Usuario responsavel |
| assignedAt | timestamp | not null | Data da atribuicao |

## Normalizacao
O modelo atende a 1FN porque todos os campos sao atomicos. Atende a 2FN porque as tabelas possuem chave primaria simples e os atributos dependem da chave inteira. Atende a 3FN porque dados de categoria, usuario e atribuicao foram separados, evitando dependencias transitivas dentro de chamados.
