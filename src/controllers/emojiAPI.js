// Combined file: emojiAPI.js

const metadata = require("../../data/metadata.json");

function getEmojiData(emojiCodepoint) {
  return metadata.data[emojiCodepoint];
}

function getSupportedEmoji() {
  return metadata.knownSupportedEmoji;
}

function isCodepoint(input) {
  return input.includes("-");
}

function emojiToCodepoint(emoji) {
  return emoji.codePointAt(0).toString(16);
}

function toPrintableEmoji(emojiCodepoint) {
  return String.fromCodePoint(
    ...emojiCodepoint.split("-").map((p) => parseInt(`0x${p}`))
  );
}

function findValidEmojiCombo(leftEmoji, rightEmoji) {
  // Convert emojis to codepoints if necessary
  const leftEmojiCodepoint = isCodepoint(leftEmoji)
    ? leftEmoji
    : emojiToCodepoint(leftEmoji);
  const rightEmojiCodepoint = isCodepoint(rightEmoji)
    ? rightEmoji
    : emojiToCodepoint(rightEmoji);

  // Find the valid emoji combination
  for (const code in metadata.data) {
    const combinations = metadata.data[code].combinations;

    for (const combination of combinations) {
      const {
        leftEmojiCodepoint: combinationLeftCodepoint,
        rightEmojiCodepoint: combinationRightCodepoint,
      } = combination;

      // console.log(combinationLeftCodepoint, "in for loop");

      if (
        combinationLeftCodepoint === leftEmojiCodepoint &&
        combinationRightCodepoint === rightEmojiCodepoint
      ) {
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
    res.json({ gStaticUrl });
  } catch (error) {
    res.status(500).json({ error: "Valid emoji combination not found" });
  }
}

function getAllPossibleEmojisForCombination(emoji) {
  const possibleEmojis = [];

  for (const code in metadata.data) {
    const combinations = metadata.data[code].combinations;

    for (const combination of combinations) {
      if (combination.rightEmoji === emoji) {
        possibleEmojis.push(combination.leftEmoji);
      }
      // console.log(combinations);
    }
  }

  // Remove duplicates from possibleEmojis array
  const uniquePossibleEmojis = [...new Set(possibleEmojis)];

  return uniquePossibleEmojis;
}

module.exports = {
  findValidEmojiComboController,
  findValidEmojiCombo,
  toPrintableEmoji,
  isCodepoint,
  emojiToCodepoint,
  getAllPossibleEmojisForCombination,
};
