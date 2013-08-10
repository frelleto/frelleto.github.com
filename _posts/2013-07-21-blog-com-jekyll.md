---
layout: post
title:  Blog com jekyll
subtitle: Como foi feito o blog do Frelleto com Jekyll, Disqus e integração com as páginas do Github.
author: Vagner Zampieri
date:   2013-07-21 9:17:05
categories: ruby jekyll
---

O [Frelleto Blog][blog] é feito com [Jekyll][jekyll], é uma ferramenta para gerar websites e blogs de forma rápida e fácil, sem precisar de banco de dados, moderação de comentário, ou bibliotecas desnecessárias. Com [Jekyll][jekyll] é possível criar permalinks, categorias, páginas, posts e layouts customizados.

Vou mostrar como fiz o blog com [Jekyll][jekyll], [Disqus][disqus] e integração com as páginas do [Github][github]. Se você tem uma conta no [Github][github] você tem um bônus interessante, poder criar um site simples com HTML estático ou com [Jekyll][jekyll]. 

#### Github

Crie um repositório com o mesmo nome do seu usuário, também funciona com organizações, no meu caso foi `frelleto.github.com`. Você pode conferir no [Github do Frelleto][github_frelleto] o código do projeto.

#### Jekyll

Na realidade o [Jekyll][jekyll] monta o seu HTML de acordo com a estrutura que você montar, por isso você vai precisar contantemente matar o serviço `jekyll server` cada vez que fizer qualquer alteração, ele cria o diretório `_site` com todo o site montado.

Escolha um layout para sua app, o time do [frelleto][frelleto] escolheu o [slate][slate], fizemos algumas modificações nele.

Para trabalhar com o [Jekyll][jekyll], está na versão `1.1.0`, estou usando o `Ruby 2.0.0-p195`. Para instalar é fácil, basta rodar o comando `gem install jekyll`.

Tem duas formas de criar a app, ou você faz com um generator `jerkyll new seu_usuario.github.com`, ou fazendo na mão. No site do [Jekyll][jekyll] você pode dar uma melhor olhada na [estrutura][structure_jekyll] de pastas e arquivos dele e montar a sua. 

Começando com o `index.html`:

<script src="https://gist.github.com/vagnerzampieri/6074434.js?file=index.html"></script>

No cabeçalho do arquivo você pode notar que ele tem duas marcações, a de `title` é o título da página que vai no `<head>` do seu HTML normal e `layout` é qual o layout que será chamado, ele fica armazenado na pasta `_layouts`, nesse caso com o nome de `default.html`. 

Os posts são automaticamente intanciados e podendo ser acessados através do método `site`, depois disso é só fazer um `for` e pegar os dados de `posts`. Quando quiser mostrar algum dado deve usar duas chaves aninhadas, quando for uma lógica use chaves com o sinal de porcento, como o exemplo acima.

O diretório `_includes` te da aquela organização que você precisa para não ficar repetindo markup em tudo que é lugar, para chamar é só fazer um `include partial_do_arquivo.html`. Tenha atenção quando for colocar css ou imagem, lembrando que o path buscado é sempre a partir da raíz, ficando assim `href='/stylesheets/seu.css'`, você pode montar a organização que quiser. 

Exemplo de post:

<script src="https://gist.github.com/vagnerzampieri/6074434.js?file=2013-07-20-blog-do-frelleto"></script>

Para montar o post basta criar um layout e chamar com o método `page` os dados do post, `content` será aonde vai ser chamado todo o post. Para gerar um post deve ser feito um arquivo dentro do diretório `_posts`, por exemplo `2013-07-21-blog-com-jekyll.md`, que é montado com data e o título do post, esses dados tbm ajudam a montar a url do post. Os posts devem ser feitos usando [Markdown][markdown]. Outra forma da url ficar diferente é colocando a marcação `categories`, e quando tiver a maração `published: false` o post não é colocado na lista de posts.

#### Disqus

Adicionar o [Disqus][disqus] no seu blog é fácil, faça uma conta no site e adicione o código gerado no HTML do layout post. Pode ser passado os dados da página ao [Disqus][disqus] com configuração.

<script src="https://gist.github.com/vagnerzampieri/6074434.js?file=disqus.html"></script>

Para trocar a url que o github gera, é só subir um arquivo CNAME e configurar o seu DNS.

Se você quiser ver como estava o código até esse post, para poder seguir, vá até a referência [4a8f295bd2f00344afda37ae60ab7074052bdc69][ref] do repositório. 

[blog]: http://blog.frelleto.com.br
[jekyll]: http://jekyllrb.com
[disqus]: http://disqus.com
[github]: https://github.com
[github_frelleto]: https://github.com/frelleto/frelleto.github.com
[slate]: http://bootswatch.com/slate/
[frelleto]: http://frelleto.com.br
[structure_jekyll]: http://jekyllrb.com/docs/structure/
[ref]: https://github.com/frelleto/frelleto.github.com/commit/4a8f295bd2f00344afda37ae60ab7074052bdc69
[markdown]: http://whatismarkdown.com/
