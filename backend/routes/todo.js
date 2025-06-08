import express from 'express';
import Todo from '../models/Todo.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post('/', auth, async (req, res) => {
  const todo = await Todo.create({ task: req.body.task, userId: req.userId });
  res.json(todo);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
});

export default router;