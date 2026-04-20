const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.json([]);
    const regex = new RegExp(name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
    const foundTrainers = await Trainer.find({ fullName: regex });
    res.json(foundTrainers);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/', async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) { res.status(400).json({ message: error.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: "Trainer deleted" });
  } catch (error) { res.status(500).json({ message: error.message }); }
});

router.post('/:id/reserve', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });

    trainer.reservations.push(req.body);
    
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;