export function generateCombinations(
  dataDict: Record<string, number>,
  combCount: number
): Record<string, number> {
  if (combCount > 5) {
    combCount = 5
  }
  const keys = Object.keys(dataDict);
  const combDict: Record<string, number> = {};

  // Функция для генерации декартова произведения
  function cartesianProduct(arr: string[], length: number): string[][] {
    let result: string[][] = [[]];
    for (let i = 0; i < length; i++) {
      result = result.flatMap((prefix) => arr.map((item) => [...prefix, item]));
    }
    return result;
  }

  for (const combo of cartesianProduct(keys, combCount)) {
    const letterComb = combo.join("");
    const probability = combo.reduce((acc, key) => acc * dataDict[key], 1);
    combDict[letterComb] = probability;
  }

  return Object.fromEntries(
    Object.entries(combDict)
      .sort(([, a], [, b]) => b - a)
      .map(([k, v]) => [k, Math.round(v * 10000) / 10000]) // Округление до 4 знаков
  );
}
