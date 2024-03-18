const express = require("express");
const emojiAPI = require("./src/controllers/emojiAPI");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define API endpoint to find a valid emoji combination
app.post("/api/findValidEmojiCombo", emojiAPI.findValidEmojiComboController);

// Define API endpoint to get all possible emojis for combination
app.post("/api/getPossibleEmojisForCombination", (req, res) => {
  const { emoji } = req.body;

  try {
    const possibleEmojis = emojiAPI.getAllPossibleEmojisForCombination(emoji);
    res.json({ possibleEmojis });
  } catch (error) {
    res.status(400).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
