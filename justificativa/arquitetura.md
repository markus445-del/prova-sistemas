# Justificativa de Arquitetura

O sistema usa PostgreSQL por ser relacional, consistente e adequado para dados com integridade forte, como usuarios, chamados, categorias e atribuicoes. A relacao N:N entre usuarios e chamados exige uma tabela pivo explicita, o que combina bem com SQL e chaves estrangeiras.

O volume estimado para o trabalho e pequeno a medio: centenas ou milhares de chamados, poucos usuarios simultaneos e consultas frequentes por status, prioridade, categoria e responsavel. Por isso os indices principais foram criados nos campos `email`, `status`, `priority`, `categoryId` e na combinacao unica `ticketId` + `userId`.

A infraestrutura segue a Opcao A dos PDFs: Docker local com Nginx como unica entrada externa, Node.js privado em rede interna, PostgreSQL com named volume e Redis em container separado. A comunicacao usa DNS interno do Docker pelo nome dos servicos, sem IP fixo.
