const metadata = require("../../data/metadata.json");

// Find the codepoint of the given emoji
function findEmojiCodepoint(emoji) {
  for (const code in metadata.data) {
    const emojiData = metadata.data[code];
    // Check if the emoji matches the input emoji
    if (emojiData.emoji === emoji) {
      return emojiData.emojiCodepoint;
    }
  }
  return null;
}

// Find a valid emoji combination for the given emojis
function findValidEmojiCombo(leftEmoji, rightEmoji) {
  const leftEmojiCodepoint = findEmojiCodepoint(leftEmoji);
  const rightEmojiCodepoint = findEmojiCodepoint(rightEmoji);

  // Find the valid emoji combination
  for (const code in metadata.data) {
    const combinations = metadata.data[code].combinations;
    for (const combination of combinations) {
      const {
        leftEmojiCodepoint: combinationLeftCodepoint,
        rightEmojiCodepoint: combinationRightCodepoint,
      } = combination;
      // Check if the combination matches the input emojis
      if (
        combinationLeftCodepoint === leftEmojiCodepoint &&
        combinationRightCodepoint === rightEmojiCodepoint
      ) {
        // Return the valid emoji combination if found
        return combination;
      }
    }
  }
  throw new Error("Valid emoji combination not found");
}

// Find a valid emoji combination and return the GStatic URL
function findValidEmojiComboController(req, res) {
  const { leftEmoji, rightEmoji } = req.body;
  if (!leftEmoji || !rightEmoji) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  try {
    const combination = findValidEmojiCombo(leftEmoji, rightEmoji);
    const gStaticUrl = combination.gStaticUrl;
    res.json(gStaticUrl);
  } catch (error) {
    res.status(404).json({ error: "Valid emoji combination not found" });
  }
}

// Get all possible emojis for a given emoji combination
function getAllPossibleEmojisForCombination(emoji) {
  const possibleEmojis = Object.values(metadata.data).flatMap((entry) =>
    entry.combinations
      .filter((combination) => combination.leftEmoji === emoji)
      .map((combination) => combination.rightEmoji)
  );

  return [...new Set(possibleEmojis)];
}

module.exports = {
  findValidEmojiComboController,
  findValidEmojiCombo,
  getAllPossibleEmojisForCombination,
};
