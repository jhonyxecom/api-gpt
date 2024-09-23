# Use uma imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho no container
WORKDIR /

# Copie o package.json e package-lock.json
COPY package.json yarn.lock ./

# Instale as dependências, incluindo o ts-node
RUN yarn install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta
EXPOSE 3001

# Defina as variáveis de ambiente necessárias
ENV PORT=3001

# Comando para rodar a aplicação usando ts-node
CMD ["npx", "ts-node", "index.ts"]
