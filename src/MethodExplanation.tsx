import React, { useState } from "react";
import {
  huffmanCodeTree,
  NodeTree,
  prepareNodes,
} from "./functions/algorithms/haffman";
import shannonFanoSteps from "./functions/algorithms/shannon_fano";
import ShannonFanoTable, { GroupStep } from "./ShannonFanoVisual";
import HuffmanVisual2 from "./HaffmanVisual2";

type MethodType = 1 | 2 | 3 | 4 | 5;

interface ExplanationProps {
  method: MethodType;
  symbolsAndFreqs: Record<string, number>;
  wikiName?: string;
}

interface VisualProps {
  rootNode: NodeTree;
  steps: GroupStep[];
  codes: Record<string, string>;
  getSymbols: Record<string, number>;
  isNeedHuffmanTable: boolean;
}

const calculateExplanation = (data: Record<string, number>) => {
  return {
    rootNode: prepareNodes(data),
    fanoSteps: shannonFanoSteps(data)[0],
    fanoCodes: shannonFanoSteps(data)[1],
  };
};

interface Props {
  letterFreq: Record<string, number>;
}
const HuffmanTable: React.FC<Props> = ({ letterFreq }) => {
  const huffmanCodes = huffmanCodeTree(prepareNodes(letterFreq));

  return (
    <>
      <h3 className="text-xl text-center font-medium text-gray-700 mb-2">
        A ready-made table of Huffman algorithm codes
      </h3>
      <div className="flex justify-center px-4">
        <div className="overflow-x-auto max-w-screen-lg">
          <table border={1} className="border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="sticky left-0 bg-gray-100 py-2 px-6 text-center border-solid border border-gray-300">
                  Буква
                </th>
                <th className="py-2 px-6 text-center border-solid border border-gray-300">
                  Частота
                </th>
                <th className="py-2 px-6 text-center border-solid border border-gray-300">
                  Код
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(letterFreq).map(([char, freq]) => (
                <tr key={char}>
                  <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 font-bold">
                    {char === "" || char === " " ? "_" : char}
                  </td>
                  <td className="py-2 px-6 text-center border border-gray-300">
                    {freq}
                  </td>
                  <td className="py-2 px-6 text-center border border-gray-300">
                    {huffmanCodes[char]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const AlgorithmsVisualization: React.FC<VisualProps> = ({
  rootNode,
  steps,
  codes,
  getSymbols,
  isNeedHuffmanTable,
}) => {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <h3 className="text-xl text-center font-medium text-gray-700 mb-2">
          Dividing symbols into groups in the Shannon-Fano algorithm
        </h3>
        <ShannonFanoTable steps={steps} data={getSymbols} codes={codes} />
      </div>
      <div>
        <h3 className="text-xl text-center font-medium text-gray-700 mb-2">
          Building a tree for the Huffman algorithm
        </h3>
        <HuffmanVisual2 rootNode={rootNode} />
      </div>
      {isNeedHuffmanTable && <HuffmanTable letterFreq={getSymbols} />}
    </div>
  );
};

const MethodExplanation: React.FC<ExplanationProps> = ({
  method,
  symbolsAndFreqs,
  wikiName,
}) => {
  const [isOpenI, setIsOpenI] = useState(false);
  const toggleSectionI = () => setIsOpenI(!isOpenI);

  const [isOpenII, setIsOpenII] = useState(false);
  const toggleSectionII = () => setIsOpenII(!isOpenII);

  const [isOpenIII, setIsOpenIII] = useState(false);
  const toggleSectionIII = () => setIsOpenIII(!isOpenIII);

  const [isOpenIV, setIsOpenIV] = useState(false);
  const toggleSectionIV = () => setIsOpenIV(!isOpenIV);

  const [isOpenV, setIsOpenV] = useState(false);
  const toggleSectionV = () => setIsOpenV(!isOpenV);

  const { rootNode, fanoSteps, fanoCodes } =
    calculateExplanation(symbolsAndFreqs);

  switch (method) {
    case 1:
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-md p-6 mx-4 mt-6">
          <div
            className="flex items-center justify-between cursor-pointer transition delay-700 duration-300 ease-in-out"
            onClick={toggleSectionI}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Method I - Encoding sequences of a given length
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[24px] h-[24px] flex-shrink-0 transition-transform duration-300 ${
                isOpenI ? "transform rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isOpenI && (
            <AlgorithmsVisualization
              rootNode={rootNode}
              steps={fanoSteps}
              codes={fanoCodes}
              getSymbols={symbolsAndFreqs}
              isNeedHuffmanTable={true}
            />
          )}
        </div>
      );
    case 2:
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-md p-6 mx-4 mt-6">
          <div
            className="flex items-center justify-between cursor-pointer transition delay-700 duration-300 ease-in-out"
            onClick={toggleSectionII}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Method II - Encoding a string with probabilities of characters
              from a string
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[24px] h-[24px] flex-shrink-0 transition-transform duration-300 ${
                isOpenII ? "transform rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isOpenII && (
            <AlgorithmsVisualization
              rootNode={rootNode}
              steps={fanoSteps}
              codes={fanoCodes}
              getSymbols={symbolsAndFreqs}
              isNeedHuffmanTable={false}
            />
          )}
        </div>
      );
    case 3:
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-md p-6 mx-4 mt-6">
          <div
            className="flex items-center justify-between cursor-pointer transition delay-700 duration-300 ease-in-out"
            onClick={toggleSectionIII}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Method III - Encoding sequences from a .docx file
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[24px] h-[24px] flex-shrink-0 transition-transform duration-300 ${
                isOpenIII ? "transform rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isOpenIII && (
            <AlgorithmsVisualization
              rootNode={rootNode}
              steps={fanoSteps}
              codes={fanoCodes}
              getSymbols={symbolsAndFreqs}
              isNeedHuffmanTable={true}
            />
          )}
        </div>
      );
    case 4:
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-md p-6 mx-4 mt-6">
          <div
            className="flex items-center justify-between cursor-pointer transition delay-700 duration-300 ease-in-out"
            onClick={toggleSectionIV}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Method IV - Encoding a string with probabilities of characters
              from the Internet
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[24px] h-[24px] flex-shrink-0 transition-transform duration-300 ${
                isOpenIV ? "transform rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isOpenIV && (
            <AlgorithmsVisualization
              rootNode={rootNode}
              steps={fanoSteps}
              codes={fanoCodes}
              getSymbols={symbolsAndFreqs}
              isNeedHuffmanTable={false}
            />
          )}
        </div>
      );
    case 5:
      return (
        <div className="bg-white border border-gray-400 rounded-lg shadow-md p-6 mx-4 mt-6">
          <div
            className="flex items-center justify-between cursor-pointer transition delay-700 duration-300 ease-in-out"
            onClick={toggleSectionV}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Method V - Encoding a string with probabilities of characters from
              the "{wikiName}" article
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[24px] h-[24px] flex-shrink-0 transition-transform duration-300 ${
                isOpenV ? "transform rotate-45" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          {isOpenV && (
            <AlgorithmsVisualization
              rootNode={rootNode}
              steps={fanoSteps}
              codes={fanoCodes}
              getSymbols={symbolsAndFreqs}
              isNeedHuffmanTable={false}
            />
          )}
        </div>
      );
  }
};

export default MethodExplanation;
