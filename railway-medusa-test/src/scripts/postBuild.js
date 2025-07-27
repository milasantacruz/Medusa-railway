const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const ROOT = process.cwd();
const MEDUSA_BUILD_PATH = path.join(ROOT, '.medusa', 'client');
const ENV_FILE_PATH = path.join(ROOT, '.env');

function log(message) {
  console.log(`[Medusa:prepare] ${message}`);
}

// 1. Verificar que el build se haya generado
if (!fs.existsSync(MEDUSA_BUILD_PATH)) {
  throw new Error(
    `.medusa/client no encontrado. Asegurate de haber corrido 'medusa build' correctamente antes de este paso.`
  );
}
log('Build de Medusa encontrado en .medusa/client');

// 2. Copiar archivo .env
if (fs.existsSync(ENV_FILE_PATH)) {
  const target = path.join(MEDUSA_BUILD_PATH, '.env');
  fs.copyFileSync(ENV_FILE_PATH, target);
  log('.env copiado a .medusa/client');
} else {
  log('Advertencia: No se encontró archivo .env en el root. Las variables de entorno pueden faltar en producción.');
}

// 3. Instalar dependencias en el build de producción
try {
  log('Instalando dependencias con yarn (modo producción)...');
  execSync('yarn install --production --frozen-lockfile', {
    cwd: MEDUSA_BUILD_PATH,
    stdio: 'inherit',
  });
  log('Dependencias instaladas correctamente');
} catch (err) {
  console.error('[Medusa:prepare] Error al instalar dependencias:', err.message);
  process.exit(1);
}
