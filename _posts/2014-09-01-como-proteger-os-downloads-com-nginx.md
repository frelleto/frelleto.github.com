---
layout: post
title:  Como proteger os downloads com NGINX
subtitle: Evite que os downloads sejam feitos sem autenticação
author: Vagner Zampieri
date: 2014-09-01 20:04:00
categories: ruby rails nginx
---

Fazer a proteção de qualquer tipo de arquivo com autenticação é uma tarefa de certa forma simples, porém, esse processo contém as seguintes etapas: configuração do `NGINX`, autenticação e o download.

O grande responsável por tudo funcionar é o [Rack::Sendfile][rack_sendfile], ele intercepta respostas que estão sendo servidas e substituí escrevendo um cabeçalho com `X-Sendfile`. O servidor web fica responsável por escrever o conteúdo do arquivo para o cliente.

O `NGINX` não usa `X-Sendfile`, usa um parecido o `X-Accel-Redirect`, que será usado como exemplo. A diferença é que o `X-Accel-Redirect` precisa mapear partes do sistema de arquivos em uma hierarquia de URL privada.

Primeiro entre no arquivo de configuração do `NGINX`, `vi /etc/nginx/sites-enabled/seu_site`:

<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=nginx"></script>

Na configuração, note que crio uma área privada `/uploads/`, ativo o `X-Accel-Redirect`, passo no cabeçalho `X-Sendfile-Type` e o `X-Accel-Mapping`. Essa é a parte mais delicada da configuração. 

Agora você precisa especificar ao `Rails` qual o Server que vai usar para o envio de arquivos. Depois que terminar é só rodar `sudo service nginx restart`, se estiver tudo certo você vai receber erro 404 quando tentar acessar a URL.

<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=production.rb"></script>

Vou mostrar antes como está a configuração dos documentos no modelo e no arquivo do `CarrierWave`.

<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=document_uploader.rb"></script>
<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=post.rb"></script>

Agora para visualizar novamente seus arquivos precisará uma autenticação, nesse exemplo uso o `Devise`.

<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=routes.rb"></script>
<script src="https://gist.github.com/vagnerzampieri/a15e724be64311f0c389.js?file=posts_controller.rb"></script>

Veja que uso o método [send_file][send_file] para mostrar o arquivo.

Fontes:

- [Kisko Labs][post]

- [X-Sendfile no NGINX][xsendfile]

- [doc do Rack::Sendfile][rack_sendfile]

Até a próxima!

[rack_sendfile]: https://github.com/rack/rack/blob/master/lib/rack/sendfile.rb
[send_file]: http://api.rubyonrails.org/classes/ActionController/DataStreaming.html#method-i-send_file
[xsendfile]: http://wiki.nginx.org/NginxXSendfile
[post]: http://blog.kiskolabs.com/post/637725747/nginx-rails-send-file
