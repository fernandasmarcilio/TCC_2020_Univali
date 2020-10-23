const list = {
  metodos: [
    {id: 0, nome: "Survey", descricao: "Este método tem por objetivo avaliar a satisfação do usuário em relação ao sistema"},
    {id: 1, nome: "Questionário", descricao: "Este método tem por objetivo avaliar a satisfação do usuário em relação ao sistema"},
    {id: 2, nome: "Teste de Usabilidade", descricao: "Esta técnica consiste em realizar uma simulação e observar a interação do usuário com o sistema em um campo ou laboratório."},
    {id: 3, nome: "Percurso Cognitivo", descricao: "Este método consiste em verificar os processos cognitivos dos usuários iniciantes através de lista de verificação orientada a tarefa."},
    {id: 4, nome: "Lista de verificação", descricao: "Este método consiste em encontrar problemas de usabilidade nas interfaces a partir de lista de verificações, guidelines e normas prontas."},
    {id: 5, nome: "Arranjo de cartas", descricao: "Esta técnica tem por objetivo organizar ideias, problemas e soluções a partir da identificação do modelo mental que o usuário elabora de um conjunto de informações."},
    {id: 6, nome: "Avaliação heurística", descricao: "Este método consiste em avaliar o sistema de acordo com os conhecimentos ergonômicos, padrões de usabilidade e heurísticas desenvolvidos por especialista."},
    {id: 7, nome: "Entrevista", descricao: "Este método consiste em realizar questionários sobre um assunto em interesse."},
  ],
  metricas: [
    {id: 0, nome: "Clareza das mensagens de erros apresentadas pelo sistema", metodos: [
      0, 1, 2
    ]},
    {id: 1, nome: "Número de mensagens de interface com problema", metodos: [
      0, 1, 2
    ]},
    {id: 2, nome: "Qualidade da informação disponibilizada pelo sistema", metodos: [
      0, 1, 2
    ]},
  ],
  requisitos: [
    {id: 0, nome: "O sistema deve prover  feedback claro", metricas: [0, 1]},
    {id: 1, nome: "O sistema deve utilizar palavras e verbos corretos na orientação para a ação", metricas: [0, 2]}
  ]
}

module.exports = list;