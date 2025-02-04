import React from "react";

interface MainTableProps {
  symbolsAndFreqs: Record<string, number>;
  symbolsAndFreqsInput: Record<string, number>;
  symbolsAndFreqsWiki: Record<string, number>;
  symbolsAndFanoCodesI: Record<string, string>;
  symbolsAndHuffmanCodesI: Record<string, string>;
  symbolsAndFanoCodesII: Record<string, string>;
  symbolsAndHuffmanCodesII: Record<string, string>;
  symbolsAndFanoCodesIII: Record<string, string>;
  symbolsAndHuffmanCodesIII: Record<string, string>;
}

const MainTableView: React.FC<MainTableProps> = ({
  symbolsAndFreqs,
  symbolsAndFreqsInput,
  symbolsAndFreqsWiki,
  symbolsAndFanoCodesI,
  symbolsAndHuffmanCodesI,
  symbolsAndFanoCodesII,
  symbolsAndHuffmanCodesII,
  symbolsAndFanoCodesIII,
  symbolsAndHuffmanCodesIII,
}) => {
  const calculateEntropy = (
    symbolsAndFreqs: Record<string, number>
  ): number => {
    let sumForEntropy = 0;
    for (const [, freq] of Object.entries(symbolsAndFreqs)) {
      sumForEntropy += freq * Math.log2(freq);
    }

    return +-sumForEntropy.toPrecision(6);
  };

  const calculateAverageLenOfBinCode = (
    symbolsAndFreqs: Record<string, number>,
    symbolsAndCodes: Record<string, string>
  ): number => {
    let n = 0;
    for (const [letter, freq] of Object.entries(symbolsAndFreqs)) {
      const ni = symbolsAndCodes[letter].length;
      n += freq * ni;
    }

    return +n.toPrecision(6);
  };

  const calculatePercentRedundancy = (
    entropy: number,
    averageLen: number
  ): string => {
    return `${((1 - entropy / averageLen) * 100).toPrecision(5)}%`;
  };

  const entropyI = calculateEntropy(symbolsAndFreqsInput);
  const entropyII = calculateEntropy(symbolsAndFreqs);
  const entropyIII = calculateEntropy(symbolsAndFreqsWiki);

  const nFanoI = calculateAverageLenOfBinCode(
    symbolsAndFreqsInput,
    symbolsAndFanoCodesI
  );
  const nFanoII = calculateAverageLenOfBinCode(
    symbolsAndFreqs,
    symbolsAndFanoCodesII
  );
  const nFanoIII = calculateAverageLenOfBinCode(
    symbolsAndFreqsWiki,
    symbolsAndFanoCodesIII
  );

  const nHuffmanI = calculateAverageLenOfBinCode(
    symbolsAndFreqsInput,
    symbolsAndHuffmanCodesI
  );
  const nHuffmanII = calculateAverageLenOfBinCode(
    symbolsAndFreqs,
    symbolsAndHuffmanCodesII
  );
  const nHuffmanIII = calculateAverageLenOfBinCode(
    symbolsAndFreqsWiki,
    symbolsAndHuffmanCodesIII
  );

  return (
    <div className="flex justify-center px-4">
      <div className="overflow-x-auto max-w-screen-xl">
        <h2 className="sticky left-0 text-3xl text-center font-semibold text-gray-800 mb-4">
          Symbols and codes table
        </h2>
        <table className="border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                rowSpan={2}
                className="sticky left-0 bg-gray-100 py-2 px-6 text-center border-solid border border-gray-300"
              >
                Symbol
              </th>
              <th
                colSpan={2}
                className="py-2 px-6 text-center border-solid border border-gray-300"
              >
                Method I
              </th>
              <th
                colSpan={2}
                className="py-2 px-6 text-center border-solid border border-gray-300"
              >
                Method II
              </th>
              <th
                colSpan={2}
                className="py-2 px-6 text-center border-solid border border-gray-300"
              >
                Method III
              </th>
            </tr>
            <tr>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Shannon-Fano
              </th>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Huffman
              </th>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Shannon-Fano
              </th>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Huffman
              </th>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Shannon-Fano
              </th>
              <th className="py-2 px-6 text-center border-solid border border-gray-300">
                Huffman
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(symbolsAndFreqs).map(([symbolKey]) => (
              <tr key={symbolKey}>
                <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 font-bold">
                  {symbolKey}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndFanoCodesI[symbolKey]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndHuffmanCodesI[symbolKey]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndFanoCodesII[symbolKey]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndHuffmanCodesII[symbolKey]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndFanoCodesIII[symbolKey]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                  {symbolsAndHuffmanCodesIII[symbolKey]}
                </td>
              </tr>
            ))}
            <tr>
              <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 font-bold">
                Entropy
              </td>
              <td
                colSpan={2}
                className="py-2 px-6 text-center border border-gray-300 bg-white"
              >
                {entropyI}
              </td>
              <td
                colSpan={2}
                className="py-2 px-6 text-center border border-gray-300 bg-white"
              >
                {entropyII}
              </td>
              <td
                colSpan={2}
                className="py-2 px-6 text-center border border-gray-300 bg-white"
              >
                {entropyIII}
              </td>
            </tr>
            <tr>
              <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 font-bold">
                Average code length
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nFanoI}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nHuffmanI}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nFanoII}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nHuffmanII}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nFanoIII}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {nHuffmanIII}
              </td>
            </tr>
            <tr>
              <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 font-bold">
                Redundancy
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyI, nFanoI)}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyI, nHuffmanI)}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyII, nFanoII)}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyII, nHuffmanII)}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyIII, nFanoIII)}
              </td>
              <td className="py-2 px-6 text-center border border-gray-300 bg-white">
                {calculatePercentRedundancy(entropyIII, nHuffmanIII)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTableView;
