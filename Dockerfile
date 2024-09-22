# Use a imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências de produção
RUN npm i

# Copie o restante do código da aplicação
COPY . .

RUN rm -rf node_modules

# Comando para rodar a aplicação
CMD ["node",  "start"]

# Exponha a porta
EXPOSE 3001

# Defina as variáveis de ambiente necessárias
ENV PORT=3001

