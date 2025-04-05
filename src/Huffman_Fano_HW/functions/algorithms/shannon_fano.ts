type SymbolProbabilities = Record<string, number>;
type GroupStep = { groups: string[][] };
type SymbolCodes = Record<string, string>;

export default function shannonFanoSteps(
  symbolsAndProbabilities: SymbolProbabilities
): [GroupStep[], SymbolCodes] {
  const steps: GroupStep[] = [];

  function splitOnGroups(
    symbolsList: SymbolProbabilities
  ): [SymbolProbabilities, SymbolProbabilities] {
    const totalSumOfProbabilities = Object.values(symbolsList).reduce(
      (sum, prob) => sum + prob,
      0
    );
    let tempSum = 0;
    let minDiff = Number.MAX_SAFE_INTEGER;
    let splitIndex = 0;

    const items = Object.entries(symbolsList);

    for (let i = 0; i < items.length; i++) {
      const [, prob] = items[i];
      tempSum += prob;
      const currentDiff = Math.abs(totalSumOfProbabilities - 2 * tempSum);
      if (currentDiff < minDiff) {
        minDiff = currentDiff;
        splitIndex = i;
      }
    }

    const leftGroup: SymbolProbabilities = Object.fromEntries(
      items.slice(0, splitIndex + 1)
    );
    const rightGroup: SymbolProbabilities = Object.fromEntries(
      items.slice(splitIndex + 1)
    );

    return [leftGroup, rightGroup];
  }

  function makeCodes(
    symbolList: SymbolProbabilities,
    prefix: string = ""
  ): SymbolCodes {
    if (Object.keys(symbolList).length === 1) {
      const symbol = Object.keys(symbolList)[0];
      return { [symbol]: prefix };
    }

    const [leftGroup, rightGroup] = splitOnGroups(symbolList);

    // Добавляем текущий шаг в таблицу
    steps.push({
      groups: [Object.keys(leftGroup), Object.keys(rightGroup)],
    });

    return {
      ...makeCodes(leftGroup, prefix + "0"),
      ...(Object.keys(rightGroup).length > 0
        ? makeCodes(rightGroup, prefix + "1")
        : {}),
    };
  }

  const codes = makeCodes(symbolsAndProbabilities);
  return [steps, codes];
}
