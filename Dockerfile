# ~/zapty-project/Dockerfile
# Estágio 1: Builder - Onde construímos a aplicação
FROM node:20-alpine AS builder 

WORKDIR /usr/src/app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o resto do código fonte
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Estágio 2: Production - A imagem final e otimizada
FROM node:20-alpine 

WORKDIR /usr/src/app

# Copia as dependências e o código compilado do estágio anterior
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação NestJS usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]