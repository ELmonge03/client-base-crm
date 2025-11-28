const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// --- DATOS DUROS AQUÍ (Para evitar errores de importación) ---
const proyectosData = {
  restaurante: [
    { nombre: 'Menú Digital QR', descripcion: 'Sistema de menú digital.', status: 'En Progreso' },
    { nombre: 'Fotos Platillos', descripcion: 'Sesión de fotos verano.', status: 'Pendiente' },
  ],
  legal: [
    { nombre: 'Web Corporativa', descripcion: 'Página web informativa.', status: 'Terminado' },
  ],
  startup: [
    { nombre: 'App MVP', descripcion: 'Versión beta para inversores.', status: 'En Progreso' },
  ],
};

const clientesParaSembrar = [
  {
    nombre: 'Restaurante El Sabor',
    email: 'contacto@elsabor.com',
    empresa: 'Grupo Gastronómico',
    telefono: '555-0199',
    proyectos: proyectosData.restaurante, 
  },
  {
    nombre: 'Lic. Ana Torres',
    email: 'ana.torres@legal.com',
    empresa: 'Despacho Legal Torres',
    telefono: '555-9988',
    proyectos: proyectosData.legal,
  },
  {
    nombre: 'Tech Startup Inc.',
    email: 'hello@techstartup.io',
    empresa: 'Tech Startup',
    telefono: '555-1234',
    proyectos: proyectosData.startup,
  },
  {
    nombre: 'Clínica Dental Sonrisas',
    email: 'citas@sonrisas.com',
    empresa: 'Salud Dental',
    telefono: '555-7777',
    proyectos: [],
  }
];

async function main() {
  console.log('Iniciando sembrado...')

  try {
    // 1. Limpiar
    await prisma.proyecto.deleteMany({})
    await prisma.cliente.deleteMany({})
    console.log('Datos viejos borrados.')
  } catch (e) {
    console.log('Continuando...')
  }

  // 2. Crear
  for (const cliente of clientesParaSembrar) {
    const { proyectos, ...datosCliente } = cliente;
    const creado = await prisma.cliente.create({
      data: {
        ...datosCliente,
        proyectos: {
          create: proyectos
        }
      }
    })
    console.log(`Cliente: "${creado.nombre}"`)
  }

  console.log('Base de datos llena.')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })