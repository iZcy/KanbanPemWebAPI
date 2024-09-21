// models/taskModels.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  listID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',  // Referensi ke Collection Lists
    required: true  // Setiap Card harus terkait dengan List
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Array referensi ke Users (bisa lebih dari satu pengguna)
  }],
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'done'],  // Status bisa 'to-do', 'in-progress', atau 'done'
    default: 'to-do'  // Default status adalah 'to-do'
  },
  createdAt: {
    type: Date,
    default: Date.now  // Waktu pembuatan otomatis diisi dengan waktu saat ini
  },
  dueDate: {
    type: Date,
    required: false  // DueDate opsional
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;



