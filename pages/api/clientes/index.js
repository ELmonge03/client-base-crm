// pages/api/clientes/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // GET: Leer todos
  if (req.method === 'GET') {
    try {
      const clientes = await prisma.cliente.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: 'Error leyendo clientes' });
    }
  }

  // POST: Crear uno
  if (req.method === 'POST') {
    try {
      const { nombre, email, empresa, telefono } = req.body;
      const nuevoCliente = await prisma.cliente.create({
        data: { nombre, email, empresa, telefono }
      });
      return res.status(201).json(nuevoCliente);
    } catch (error) {
      return res.status(500).json({ error: 'Error creando cliente' });
    }
  }
}