# Tarefas a Fazer

Aplicação de lista de tarefas (to-do list) desenvolvida para a disciplina **Requisitos e Modelagem de Sistemas**, com foco em levantamento de requisitos através de entrevista com o professor atuando como stakeholder.

## Sobre o projeto

O sistema permite ao usuário cadastrar, editar, concluir e remover tarefas de uma lista, com persistência local dos dados. A interface foi pensada para um público adulto com menor familiaridade com tecnologia, priorizando clareza, legibilidade e feedback visual simples em vez de densidade de informação.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (vanilla, sem frameworks ou bibliotecas)
- `localStorage` do navegador para persistência de dados

## Funcionalidades

- Adicionar tarefas à lista
- Editar uma tarefa já cadastrada (via modal)
- Marcar uma tarefa como concluída, movendo-a para um quadro separado
- Ver a data e o horário de conclusão de uma tarefa (via modal, ao clicar sobre ela)
- Remover uma tarefa, com confirmação prévia (via modal)
- Persistência das tarefas após atualizar a página

## Requisitos do sistema

### Requisitos funcionais
- O usuário deve poder adicionar novas tarefas à lista através de um campo de entrada e um botão
- O usuário deve poder remover tarefas da lista clicando em um botão de exclusão ao lado de cada item

### Requisitos não-funcionais
- A interface deve se adaptar a diferentes tamanhos de tela, funcionando bem em dispositivos móveis e desktop
- A aplicação deve ser intuitiva, com feedback visual claro para ações do usuário, como adicionar e remover itens

### Requisitos de domínio
- O sistema deve validar se o texto da tarefa não está vazio antes de adicioná-la à lista
- As tarefas devem ser mantidas mesmo após atualizar a página, usando `localStorage` do navegador

### Regras de negócio
- O usuário não pode adicionar mais de 10 tarefas à lista
- A primeira letra de cada tarefa é automaticamente capitalizada

### Requisitos levantados na entrevista com o stakeholder
- Confirmação antes de excluir uma tarefa
- Ao marcar uma tarefa como concluída, ela deve ser movida para um quadro separado de "Tarefas Concluídas"
- Ao clicar em uma tarefa concluída, o sistema deve exibir a data e o horário em que ela foi concluída
- Público-alvo do sistema: adultos com pouca familiaridade com tecnologia — interface simplificada e legível
- Paleta de cores em tons pastéis

## Estrutura de pastas

```
lista-de-tarefas/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── assets/
    └── images/
        └── logo.png
```

## Como rodar o projeto

1. Clone este repositório
2. Abra a pasta no VSCode
3. Use a extensão **Live Server** para rodar o `index.html`, ou apenas abra o arquivo diretamente no navegador

Não é necessário instalar dependências — o projeto não usa build tools nem pacotes externos.

## Deploy

Aplicação publicada no Vercel.

Clique no link abaixo para visualizar a aplicação.

[Tarefas a Fazer - Vercel](https://tarefas-a-fazer.vercel.app/)