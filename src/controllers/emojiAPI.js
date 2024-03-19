// Combined file: emojiAPI.js

const metadata = require("../../data/metadata.json");

function getEmojiData(emojiCodepoint) {
  return metadata.data[emojiCodepoint];
}

function getSupportedEmoji() {
  return metadata.knownSupportedEmoji;
}

function findEmojiCodepoint(emoji) {
  // Iterate through the metadata to find the emoji
  for (const code in metadata.data) {
    const emojiData = metadata.data[code];
    // Check if the emoji matches the input emoji
    if (emojiData.emoji === emoji) {
      return emojiData.emojiCodepoint;
    }
  }

  // If the emoji is not found, return null or throw an error
  return null;
}


function findValidEmojiCombo(leftEmoji, rightEmoji) {

  const leftEmojiCodepoint = findEmojiCodepoint(leftEmoji);
  // console.log(leftEmojiCodepoint);

  const rightEmojiCodepoint = findEmojiCodepoint(rightEmoji);
  // console.log(rightEmojiCodepoint);

  // Find the valid emoji combination
  for (const code in metadata.data) {
    const combinations = metadata.data[code].combinations;

    for (const combination of combinations) {
      const {
        leftEmojiCodepoint: combinationLeftCodepoint,
        rightEmojiCodepoint: combinationRightCodepoint,
      } = combination;

      if (
        combinationLeftCodepoint === leftEmojiCodepoint &&
        combinationRightCodepoint === rightEmojiCodepoint
      ) {
        console.log(combination);
        return combination;
      }
    }
  }
  throw new Error("Valid emoji combination not found");
}

function findValidEmojiComboController(req, res) {
  const { leftEmoji, rightEmoji } = req.body;

  try {
    const combination = findValidEmojiCombo(leftEmoji, rightEmoji);
    const gStaticUrl = combination.gStaticUrl;
    res.json(combination);
  } catch (error) {
    res.status(404).json({ error: "Valid emoji combination not found" });
  }
}

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
