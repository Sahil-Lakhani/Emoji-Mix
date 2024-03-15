const express = require("express");
const emojiController = require("./src/controllers/emojiController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define API endpoint to find a valid emoji combination
app.post("/api/findValidEmojiCombo", emojiController.findValidEmojiCombo);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
