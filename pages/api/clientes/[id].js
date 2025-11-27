// pages/api/clientes/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const clienteId = Number(req.query.id); // Convertir ID a numero

  // DELETE: Borrar
  if (req.method === 'DELETE') {
    try {
      await prisma.cliente.delete({
        where: { id: clienteId },
      });
      return res.status(200).json({ message: 'Eliminado' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al eliminar' });
    }
  }

  // PUT: Editar
  if (req.method === 'PUT') {
    try {
      const { nombre, email, empresa, telefono } = req.body;
      const clienteActualizado = await prisma.cliente.update({
        where: { id: clienteId },
        data: { nombre, email, empresa, telefono },
      });
      return res.status(200).json(clienteActualizado);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error al actualizar' });
    }
  }
}