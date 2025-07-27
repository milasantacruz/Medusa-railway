# Imagen base
FROM node:20

WORKDIR /app
COPY . .

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y dos2unix

# Instalar dependencias Node.js
RUN yarn install

# Ejecutar build y luego corregir saltos de línea en archivos generados
RUN yarn build && \
    find .medusa/client -type f -exec dos2unix {} \;

WORKDIR /app/.medusa/client
EXPOSE 9000
CMD ["yarn", "start"]
