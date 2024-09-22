# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Defina a variável de ambiente para a porta
ENV PORT=3001

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start" ]
