const Card = require("../models/cardModels");

// Create a new card
const cardsPost = async (req, res) => {
  try {
    const { title, description, listId, assignedTo, status, createdAt, dueDate } = req.body;
    
      // Check body existence
      if (!title) return res.status(400).json({ data: "Title is required." });
      if (!description) return res.status(400).json({ data: "Description is required." });
      if (!listId) return res.status(400).json({ data: "List ID is required." });
      if (!assignedTo) return res.status(400).json({ data: "Assigned To is required." });
      if (!status) return res.status(400).json({ data: "Status is required." });
      if (!createdAt) return res.status(400).json({ data: "Created At is required." });
      if (!dueDate) return res.status(400).json({ data: "Due Date is required." });
    
      // Check the data types
      if (!mongoose.Types.ObjectId.isValid(listId)) return res.status(400).json({ error: "List ID type must be ObjectId" });
      if (!Array.isArray(assignedTo)) return res.status(400).json({ error: "Assigned To must be an array" });

    const newCard = new Card({
      title,
      description,
      listId,
      assignedTo,
      status,
      createdAt,
      dueDate
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ data: "Error creating card" });
  }
};

// Get all cards
const cardsGet = async (req, res) => {
  try {
    const cards = await Card.find().populate("assignedTo"); // Populate users
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ data: "Failed to retrieve cards due to server error" });
  }
};

// Update a card
const cardsPatch = async (req, res) => {
  try {
    const { title, status } = req.body;

    // Check body existence
    if (!cardId) return res.status(400).json({ error: "Card ID is required." });
    if (!title && !status) return res.status(400).json({ error: "At least one field (title or status) is required to update." });

    // Check if the card ID is valid
    if (!mongoose.Types.ObjectId.isValid(cardId)) return res.status(400).json({ error: "Card ID type must be ObjectId" });
    if (!cardId)
      return res.status(400).json({ message: "Card ID is required." });
    if (!title && !status)
      return res.status(400).json({
        message: "At least one field (title or status) is required to update."
      });

    // Check if the card ID is valid
    if (!mongoose.Types.ObjectId.isValid(cardId))
      return res.status(400).json({ message: "Card ID type must be ObjectId" });

    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title, status },
      { new: true }
    );

    if (!updatedCard) return res.status(404).json({ data: 'Card not found' });
    if (!updatedCard)
      return res.status(404).json({ message: "Card not found" });

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ data: "Cannot update card" });
  }
};

// Delete a card
const cardsDelete = async (req, res) => {
  try {
    const cardId = req.params.id;

    // Check if the card ID is provided
    if (!cardId) return res.status(400).json({ error: "Card ID is required." });

    // Check if the card ID is valid
    if (!mongoose.Types.ObjectId.isValid(cardId)) return res.status(400).json({ error: "Card ID type must be ObjectId" });

    // Check if the card ID is valid
    if (!mongoose.Types.ObjectId.isValid(cardId))
      return res.status(400).json({ message: "Card ID type must be ObjectId" });

    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard)
      return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
 } catch (error) {
    res.status(500).json({ data: "Failed to delete card" });
  }
};

module.exports = {
  cardsPost,
  cardsGet,
  cardsPatch,
  cardsDelete
};
