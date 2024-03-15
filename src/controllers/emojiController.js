const emojiService = require("../services/emojiService");

exports.findValidEmojiCombo = (req, res) => {
  const { leftEmoji, rightEmoji } = req.body;

  try {
    const combination = emojiService.findValidEmojiCombo(leftEmoji, rightEmoji);
    res.json({ combination });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
