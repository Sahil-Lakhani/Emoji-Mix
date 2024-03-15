exports.isCodepoint = (input) => {
  return input.includes("-");
};

exports.emojiToCodepoint = (emoji) => {
  return emoji.codePointAt(0).toString(16);
};

exports.toPrintableEmoji = (emojiCodepoint) => {
  return String.fromCodePoint(
    ...emojiCodepoint.split("-").map((p) => parseInt(`0x${p}`))
  );
};
