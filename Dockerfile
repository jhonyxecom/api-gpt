# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências de produção
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Defina as variáveis de ambiente necessárias
ENV PORT=3001

# Exponha a porta
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
