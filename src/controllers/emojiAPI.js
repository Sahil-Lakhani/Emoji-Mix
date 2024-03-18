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
  const validCombination = Object.values(metadata.data)
    .flatMap((entry) => entry.combinations)
    .find(
      ({ leftEmojiCodepoint, rightEmojiCodepoint }) =>
        leftEmojiCodepoint === leftEmojiCodepoint &&
        rightEmojiCodepoint === rightEmojiCodepoint
    );

  if (validCombination) {
    return validCombination;
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
    res.status(404).json({ error: "Valid emoji combination not found" });
  }
}

function getAllPossibleEmojisForCombination(emoji) {
  const possibleEmojis = Object.values(metadata.data).flatMap((entry) =>
    entry.combinations
      .filter((combination) => combination.rightEmoji === emoji)
      .map((combination) => combination.leftEmoji)
  );

  return [...new Set(possibleEmojis)];
}


module.exports = {
  findValidEmojiComboController,
  findValidEmojiCombo,
  toPrintableEmoji,
  isCodepoint,
  emojiToCodepoint,
  getAllPossibleEmojisForCombination,
};
