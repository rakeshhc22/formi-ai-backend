export function limitToTokenCount(dataArray, maxTokens = 800) {
  let tokenEstimate = 0;
  const sliced = [];

  for (const item of dataArray) {
    const text = Object.values(item).join(" ");
    const tokens = Math.ceil(text.split(" ").length * 1.3);
    if (tokenEstimate + tokens <= maxTokens) {
      sliced.push(item);
      tokenEstimate += tokens;
    } else break;
  }
  return sliced;
}
