---
layout: post
title:  Cuide do Banco de Dados com carinho
subtitle: Boas práticas utilizando.
author: Vagner Zampieri
date: 2014-10-31 14:28:00
categories: database
---

O Banco de Dados é uma peça fundamental na construção de sua aplicação, bem escrito vai sobreviver muito mais do que qualquer aplicação jamais conseguirá. Os dados armazenados valem bilhões em determinadas casos, então cuide bem deles.

Não exagere ao pegar os dados de um cliente. Se não for importante para o funcionamento do sistema, não solicite o dado, o usuário odeia digitar informações desnecessárias e sigilosas, quando for CPF ou o número do cartão, esse cadastro pode ser feito na hora que ele for comprar de fato um produto.

Cuidado com as informações gravadas, não salve a senha do usuário em texto puro, ou grave o número do cartão de crédito, faça do jeito certo, pesquise como resolver problemas do tipo, esse tipo de coisa são falhas graves.

###Base de endereços

Quem nunca lidou com uma base oficial de endereços não sabe como é complexo o Brasil e como suas ruas são bagunçadas, ai logo vai procurar alguma alma que tenha disponibilizado a sua base, mas se quiser algo profissional mesmo, vai gastar uma grana nesse tipo de coisa, ou deixar disponível para o usuário cadastrar essas informações, mas sem uma validação descente e uma confirmação, seus dados serão apenas lixo.

Não pensem que a base dos Correios é a melhor, Oi e Light tem coisas muito mais interessantes, que vão a nível de número em uma precisão incrível, só que tudo tem um preço.

Endereços são muito importantes para construção de mapas precisos, se você tem uma base ruim, terá uma amostragem de dados imprecisa que não refletirá o seu banco da forma correta, lembrem de sempre gravar a latitude e longitude logo, se precisarem, se forem converter mais tarde, façam em background, senão seus mapas nunca serão gerados rápidos.

###Migrações

Você já migrou os dados de um banco para outro? Normalmente você se preocupa com o estado do seu banco, quando precisa fazer uma migração, mas ai já era, os dados já estão lá e vai ser muito ruim fazer a migração. Trabalho em conjunto com um DBA e sempre mantemos nossas bases de uma forma que facilite a vida caso haja necessidade de migração, mas só tenho essa preocupação por que já fiz algumas e sei como dá trabalho quando os dados estão ruins.

###Documentação

É uma boa prática fazer um dicionário de dados, se você tem um DBA na equipe ele vai te agradecer muito e não vai te chamar tanto para perguntar algo a respeito, não adianta só ter uma aplicação bem escrita, quando se tem uma pessoa só responsável pelo Banco ele não olha tanto a aplicação e nem tem necessidade se as informações que ele precisa estiverem em um banco ou em um documento que ele tenha acesso, não é dificil de fazer. Sempre disponibilize alguns diagramas, se você tem preguiça de fazer um, tem ferramentas que geram isso, tanto olhando a app como olhando somente o banco.

###Constraints

Alguns tipos de constraints são importantes deixarem no banco também, tenho o costume de colocar `not null`, `precision`, `default` e `unique`. A de `foreign_key` no rails precisa de uma particuliaridade, prefiro fazer na mão:

<script src="https://gist.github.com/vagnerzampieri/03bf971891ee63487a59.js?file=migration.rb"></script>

Quando for usar SQL puro em uma migração use `reversible`, ele vai ser bem útil quando criar o `up` e o `down`, dentro do bloco, vai conseguir fazer o `rollback` de forma fácil.

Quando se coloca um SQL em uma migration não se pode usar mais o `db/schema.rb`, é preciso mudar no `config/application.rb` e colocar `config.active_record.schema_format = :sql`.

Uma outra constraint que pode usar é o `CHECK`.

###Índices

Não faça índices desnecessários, um índice pode ser seu aliado ou a sua destruição, só crie em sua tabela se você for usá-lo, se usa alguma ferramenta como o Elasticsearch, não tem necessidade de criá-los. Quanto maior a quantidade de índices nas tabelas mais tempo elas utilizarão para gravar/alterar dados.

###uuid

Faz bastante tempo que não uso `uuid`, mas já vi muita gente usando métodos para criar esse tipo de incremento, não faça isso, algumas responsabilidade são do banco, então deixe o seu banco fazer o que é função dele, no PostgreSQL tem um tipo uuid e uma função que incrementa isso automaticamente, é só chamar a função que ela fará.

###Conclusão

Falei tanto de PostgreSQL, mas aprenda NoSQL também. Use o bom senso para utilizar algumas práticas, se preocupe em mante-lo atualizado, por causa de segurança, entenda realmente para que serve um banco de dados.

Até a próxima!
