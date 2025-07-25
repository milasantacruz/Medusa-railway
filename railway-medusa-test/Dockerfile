# Imagen base
FROM node:20

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos
COPY . .

# Instalar dependencias con Yarn
RUN yarn install

# Ejecutar el build de Medusa y el postBuild.js
RUN yarn build

# Cambiar al cliente generado
WORKDIR /app/.medusa/client

# Exponer el puerto de Medusa (9000 por defecto)
EXPOSE 9000

# Comando para iniciar el servidor
CMD ["yarn", "start"]
