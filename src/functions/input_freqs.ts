export default function getInputFrequencies(
  inputStr: string
): Record<string, number> {
  const frequencies: Record<string, number> = {};
  const goodInputStr = inputStr.replace(/[^A-Za-z]/g, "").toUpperCase();
  const inputStrLength = goodInputStr.length;

  for (const char of goodInputStr) {
    frequencies[char] = (frequencies[char] || 0) + 1;
  }

  for (const char in frequencies) {
    frequencies[char] = +(frequencies[char] / inputStrLength).toPrecision(6);
  }

  return Object.fromEntries(
    Object.entries(frequencies).sort((a, b) => b[1] - a[1])
  );
}
