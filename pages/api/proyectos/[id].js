// pages/api/proyectos/[id].js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const id = Number(req.query.id); // Capturamos el ID del proyecto

  // 1. ELIMINAR (DELETE)
  if (req.method === 'DELETE') {
    try {
      await prisma.proyecto.delete({ where: { id } });
      return res.status(200).json({ message: 'Eliminado' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar' });
    }
  }

  // 2. ACTUALIZAR / EDITAR (PUT)
  if (req.method === 'PUT') {
    try {
      const { nombre, descripcion, status, clienteId } = req.body;
      
      const actualizado = await prisma.proyecto.update({
        where: { id },
        data: {
          nombre,
          descripcion,
          status,
          clienteId: Number(clienteId) // Importante: convertir a número
        }
      });
      return res.status(200).json(actualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al actualizar' });
    }
  }
}