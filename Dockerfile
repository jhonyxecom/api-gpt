# Use a imagem base do Node.js
FROM node:latest
# Defina o diretório de trabalho dentro do container
WORKDIR /

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta do servidor
EXPOSE 3001

# Inicie o servidor
CMD ["npm", "start"]
