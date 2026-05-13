const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { checkJwt, checkRole } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /courses - ADMIN e USER
router.get('/', checkJwt, async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { dataCadastro: 'desc' },
    });
    res.json(courses);
  } catch {
    res.status(500).json({ error: 'Erro ao listar cursos' });
  }
});

// POST /courses - apenas ADMIN
router.post('/', checkJwt, checkRole('ADMIN'), async (req, res) => {
  const { codigo, nome, instrutor } = req.body;

  if (!codigo || !nome || !instrutor) {
    return res.status(400).json({ error: 'Campos obrigatórios: codigo, nome, instrutor' });
  }

  const adminEmail =
    req.auth.payload['https://courses-app.com/email'] ||
    req.auth.payload.sub;

  try {
    const course = await prisma.course.create({
      data: { codigo, nome, instrutor, adminEmail },
    });
    res.status(201).json(course);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Código de curso já existe' });
    }
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
});

// DELETE /courses/:id - apenas ADMIN
router.delete('/:id', checkJwt, checkRole('ADMIN'), async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao deletar curso' });
  }
});

module.exports = router;
