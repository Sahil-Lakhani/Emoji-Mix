const emojiUtils = require("../utils/emojiUtils");
const metadata = require("../../data/metadata.json");

exports.findValidEmojiCombo = (leftEmoji, rightEmoji) => {
  // Convert emojis to codepoints if necessary
  const leftEmojiCodepoint = emojiUtils.isCodepoint(leftEmoji)
    ? leftEmoji
    : emojiUtils.emojiToCodepoint(leftEmoji);
  const rightEmojiCodepoint = emojiUtils.isCodepoint(rightEmoji)
    ? rightEmoji
    : emojiUtils.emojiToCodepoint(rightEmoji);

  // Find the valid emoji combination
  for (const code in metadata.data) {
    const combination = metadata.data[code];
    if (
      combination.leftEmojiCodepoint === leftEmojiCodepoint &&
      combination.rightEmojiCodepoint === rightEmojiCodepoint
    ) {
      return combination;
    }
  }

  throw new Error("Valid emoji combination not found");
};
