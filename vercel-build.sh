#!/bin/bash

# Navegar para a pasta do projeto
cd project

# Instalar dependências
npm install

# Construir o projeto
npm run build

# Copiar arquivos importantes para a pasta dist
cp public/_redirects dist/
cp public/robots.txt dist/ 2>/dev/null || :
cp public/sitemap.xml dist/ 2>/dev/null || :

# Criar arquivo vercel.json na pasta dist
cat > dist/vercel.json << EOL
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/club", "dest": "/index.html" },
    { "src": "/club/(.*)", "dest": "/index.html" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOL

echo "Build concluído com sucesso!"
