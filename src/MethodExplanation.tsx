import React, { useState } from "react";
import { NodeTree, prepareNodes } from "./functions/algorithms/haffman";
import shannonFanoSteps from "./functions/algorithms/shannon_fano";
import ShannonFanoTable, { GroupStep } from "./ShannonFanoVisual";
import HuffmanVisual2 from "./HaffmanVisual2";

type MethodType = 1 | 2 | 3;

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
}

const calculateExplanation = (data: Record<string, number>) => {
  return {
    rootNode: prepareNodes(data),
    fanoSteps: shannonFanoSteps(data)[0],
    fanoCodes: shannonFanoSteps(data)[1],
  };
};

const AlgorithmsVisualization: React.FC<VisualProps> = ({
  rootNode,
  steps,
  codes,
  getSymbols,
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
              Method I - Encoding a string with probabilities of characters from
              a string
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
              from the Internet
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
              Method III - Encoding a string with probabilities of characters
              from the "{wikiName}" article
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
            />
          )}
        </div>
      );
  }
};

export default MethodExplanation;
