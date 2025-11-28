// pages/api/proyectos/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // GET: Leer todos (incluyendo datos del cliente dueño)
  if (req.method === 'GET') {
    try {
      const proyectos = await prisma.proyecto.findMany({
        include: { cliente: true }, // <--- TRUCO: Trae el nombre del cliente
        orderBy: { id: 'desc' }
      });
      return res.status(200).json(proyectos);
    } catch (error) {
      return res.status(500).json({ error: 'Error leyendo proyectos' });
    }
  }

  // POST: Crear proyecto
  if (req.method === 'POST') {
    try {
      const { nombre, descripcion, status, clienteId } = req.body;
      const nuevo = await prisma.proyecto.create({
        data: {
          nombre,
          descripcion,
          status,
          clienteId: Number(clienteId), // Convertimos a numero por seguridad
        }
      });
      return res.status(201).json(nuevo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error creando proyecto' });
    }
  }
}