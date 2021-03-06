---
layout: post
title:  Busca no Jekyll usando AngularJS
subtitle: Indo de encontro com o framework de Javascript da moda, faça uma busca utilizando AngularJS no seu blog com Jekyll.
author: Vagner Zampieri
date:   2013-08-10 14:00:00
categories: javascript angularjs
---
Comecei a brincar com o [AngularJS][angularjs] esses dias, estava esperando ele ganhar mais popularidade, já que trabalho mais com backend utilizando Ruby. Como estava procurando um bom framework de javascript e decidi testar o AngularJS, achei facilmente referências dele no [tutorial][angularjs_tutorial] que está no site e um [vídeo][angularjs_video] do [Dan Wahlin][dan_wahlin] muito bom para começar a dar uma olhada.

Pensei logo, O que posso fazer com AngularJS? ... Busca no blog do [Frelleto][blog] :).

Já expliquei no [último post][last_post] como fazer um blog com Jekyll, Disqus e usando o Github, então vou dar continuidade mostrando a evolução do blog utilizando ferramentas simples e muito poderosas.

A funcionalidade da busca será bem simples, terá um `input` para fazer a busca, que ao serem digitados irão buscar os dados: date, title(está concatenado com autor) e subtitle. A busca ficará dinâmica, então assim que começar a digitar os dados que você quer buscar, só vai mostrar posts que tiverem aquele resultado.

Obs.: Não vou explicar como o AngularJS funciona em detalhes, vou apenas mostrar como implementei ele e algumas particuliaridades que aconteceram comigo durante o processo.

Faça o download do AngularJS no site, adiciionei a versão mimificada em `javascript/angular.min.js`, adicione o arquivo na pasta correspondente no seu projeto. Não esqueça de adicionar a chamada do arquivo no `head` do projeto. 

Na crie o arquivo `javascript/FrelletoBlog.js`, ele precisa ser criado assim para ser reconhecido e utilizado. Nele será implementado o módulo `FrelletoBlog`, o método `FrelletoBlog.filter` para poder buscar em todos os objetos que quero e o controller, que se chamará `SearchController`, onde $scope.post armazenará todos os posts existentes, onde substituirá o método `site.posts` original do Jekyll.

<script src="https://gist.github.com/vagnerzampieri/6202010.js?file=FrelletoBlog.js"></script>

Não esqueça de fazer a chamada desse arquivo no seu HTML `<script type="text/javascript" src="/javascript/FrelletoBlog.js"></script>`.

Para você utilizar o AngularJS é preciso chamar a tag dele `ng-app` como vou utilizar apenas esse módulo, por enquanto, adicionarei na tag `html`. No pedaço do seu código que for utilizar o controller `SearchController` adicione a tag `ng-controller`. 

<script src="https://gist.github.com/vagnerzampieri/6202010.js?file=default.html"></script>

Faça um campo de busca simples e identifique com a tag `ng-model`, o valor `searchText` esse será o valor para pegar o dado e buscar.

<script src="https://gist.github.com/vagnerzampieri/6202010.js?file=search.html"></script>

Você irá precisar manipular os dados do post para poder colocar a view da forma que o AngularJS vai trabalhar, crie o arquivo `_includes/Helper/FrelletoBlogPosts`, tem que seguir essa conveção para funcionar, com isso vai ser montado o array da forma que você vai precisar trabalhar.

<script src="https://gist.github.com/vagnerzampieri/6202010.js?file=FrelletoBlogPosts"></script>

Para montar a busca é só colocar as tags certas e chamar os valores instanciados, `FrelletoBlog.posts` irá receber os dados que você manipulou acima e passou para o controller. A tag `ng-repeat` é aonde deverá ser colocado o `for`, o `filter:searchText` fará a busca utilizando o dado de `searchText`. Aonde for colocado a tag `ng-bind-html-unsafe` será os dados que irão aparecer e o `highlight:searchText` serão os dados pesquisados.

<script src="https://gist.github.com/vagnerzampieri/6202010.js?file=index.html"></script>

Como disse não é complexo fazer busca usando AngularJS, para ver como o blog funciona, é só olhar o código no [Github do Frelleto][github_frelleto].

Até a próxima!

[angularjs]: http://angularjs.org/
[angularjs_tutorial]: http://docs.angularjs.org/tutorial
[angularjs_video]: http://www.youtube.com/watch?v=i9MHigUZKEM
[dan_wahlin]: http://weblogs.asp.net/dwahlin/
[last_post]: http://blog.frelleto.com.br/ruby/jekyll/2013/07/21/blog-com-jekyll/
[blog]: http://blog.frelleto.com.br
[jekyll]: http://jekyllrb.com
[github_frelleto]: https://github.com/frelleto/frelleto.github.com
[frelleto]: http://frelleto.com.br
