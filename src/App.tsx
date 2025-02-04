import { huffmanCodeTree, prepareNodes } from "./functions/algorithms/haffman";
import shannonFanoSteps from "./functions/algorithms/shannon_fano";
// import ShannonFanoTable from "./ShannonFanoVisual";
// import HuffmanVisual2 from "./HaffmanVisual2";
import axios from "axios";
import { useState } from "react";
import getInputFrequencies from "./functions/input_freqs";
import MainTableView from "./MainTableView";
import MethodExplanation from "./MethodExplanation";
import FAQSection from "./FAQSection";

const codeString = (str: string, codesDict: Record<string, string>): string => {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = codesDict[str[i].toUpperCase()];
    if (code === undefined) {
      result += str[i] + " ";
    } else {
      result += code + " ";
    }
  }
  return result
    .replace(/\s+/g, " ")
    .replace(/\s([^a-zA-Z0-9])\s+/g, "$1")
    .trim();
};

function App() {
  const [url, setUrl] = useState("");
  const [input, setInput] = useState("");
  const [userString, setUserString] = useState("");
  const [urlRemember, setUrlRemember] = useState("");

  const [wikiFreqs, setWikiFreqs] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isStartCrypto, setIsStartCrypto] = useState(false);
  const [isError, setError] = useState(false);

  const englishLettersFreq = {
    E: 0.127,
    T: 0.0906,
    A: 0.0817,
    O: 0.0751,
    I: 0.0697,
    N: 0.0675,
    S: 0.0633,
    H: 0.0609,
    R: 0.0599,
    D: 0.0425,
    L: 0.0403,
    C: 0.0278,
    U: 0.0276,
    M: 0.0241,
    W: 0.0236,
    F: 0.0223,
    G: 0.0202,
    Y: 0.0197,
    P: 0.0193,
    B: 0.0149,
    V: 0.0098,
    K: 0.0077,
    X: 0.0015,
    J: 0.0015,
    Q: 0.001,
    Z: 0.0007,
  };

  const parseWiki = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://parser-app-4v2t.onrender.com/api/proxy",
        {
          params: {
            url: url,
          },
        }
      );
      setUserString(input);
      setUrlRemember(url);

      setWikiFreqs(response.data.data);
      setUrl("");
      setIsStartCrypto(true);
      setInput("");
      setError(false);
    } catch (err) {
      console.error("Error parsing Wikipedia:", err);
      setError(true);
      setUrl("");
    } finally {
      setIsLoading(false);
    }
  };

  const isFirstMethodAvailable = isStartCrypto;
  const isSecondMethodAvailable = isStartCrypto;
  const isThirdMethodAvailable = Object.keys(wikiFreqs).length > 0;

  const inputFreqs = getInputFrequencies(userString);
  const wikiFrequencies = isThirdMethodAvailable ? wikiFreqs : {};

  // Первый метод: кодирование строки с вероятностями из самой строки
  const firstHuffmanCodes = isFirstMethodAvailable
    ? huffmanCodeTree(prepareNodes(inputFreqs))
    : {};
  const [, firstFanoCodes] = isFirstMethodAvailable
    ? shannonFanoSteps(inputFreqs)
    : [[], {}];

  // Второй метод: кодирование строки с вероятностями из интернета
  const secondHuffmanCodes = isSecondMethodAvailable
    ? huffmanCodeTree(prepareNodes(englishLettersFreq))
    : {};
  const [, secondFanoCodes] = isSecondMethodAvailable
    ? shannonFanoSteps(englishLettersFreq)
    : [[], {}];

  // Третий метод: кодирование строки с вероятностями с парсинга
  const thirdHuffmanCodes = isThirdMethodAvailable
    ? huffmanCodeTree(prepareNodes(wikiFrequencies))
    : {};
  const [, thirdFanoCodes] = isThirdMethodAvailable
    ? shannonFanoSteps(wikiFrequencies)
    : [[], {}];

  const wikiUrlSplit: string[] =
    urlRemember !== ""
      ? urlRemember.split("/")
      : "https://en.wikipedia.org/wiki/Cryptography".split("/");
  const wikiArticleName = wikiUrlSplit[wikiUrlSplit.length - 1]
    .replace(/[^A-Za-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <>
      <h2 className="text-5xl text-center mt-2">
        Shannon-Fano and Huffman encoding
      </h2>
      <div className="max-w-screen">
        <div className="mt-10 flex items-center justify-center mb-4">
          <div className="w-lg mx-2 lg:flex lg:flex-col lg:items-center lg:space-y-4">
            <div className="gap-4 lg:flex lg:space-x-4 lg:w-full">
              <div className="relative z-0 w-full mb-5 group lg:mb-0">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=" "
                  name="floating_text"
                  autoComplete="off"
                />
                <label
                  htmlFor="floating_text"
                  className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter a string(min 2 unique letters)
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group lg:mb-0">
                <input
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder=" "
                  name="floating_link"
                  autoComplete="off"
                />
                <label
                  htmlFor="floating_link"
                  className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Link to the English Wiki article
                </label>
                {isError && (
                  <p className="text-sm text-red-600">
                    Enter the correct link or don't enter anything!
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mx-auto lg:w-full">
              <button
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-500"
                onClick={parseWiki}
                disabled={
                  isLoading ||
                  input.replace(/[^A-Za-z]/g, "").replace(/(.)\1+/g, "$1")
                    .length < 2
                }
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <svg
                      className="w-6 h-6 stroke-indigo-100 animate-spin mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_9023_61563)">
                        <path
                          d="M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444"
                          stroke="stroke-current"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          className="my-path"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_9023_61563">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Encoding</span>
                  </div>
                ) : (
                  "Start encode"
                )}
              </button>
            </div>
          </div>
        </div>
        {isStartCrypto && (
          <>
            <div className="mx-4 p-6 bg-white rounded-lg shadow-md mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 max-w-lg break-words whitespace-normal">
                Encoded string "{userString}"
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Method I:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <span className="font-mono">
                      {codeString(userString, firstFanoCodes)}
                    </span>{" "}
                    - Shannon-Fano algorithm
                  </li>
                  <li>
                    <span className="font-mono">
                      {codeString(userString, firstHuffmanCodes)}
                    </span>{" "}
                    - Huffman algorithm
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Method II:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <span className="font-mono">
                      {codeString(userString, secondFanoCodes)}
                    </span>{" "}
                    - Shannon-Fano algorithm
                  </li>
                  <li>
                    <span className="font-mono">
                      {codeString(userString, secondHuffmanCodes)}
                    </span>{" "}
                    - Huffman algorithm
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Method III:
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>
                    <span className="font-mono">
                      {codeString(userString, thirdFanoCodes)}
                    </span>{" "}
                    - Shannon-Fano algorithm
                  </li>
                  <li>
                    <span className="font-mono">
                      {codeString(userString, thirdHuffmanCodes)}
                    </span>{" "}
                    - Huffman algorithm
                  </li>
                </ul>
              </div>
            </div>
            <MainTableView
              symbolsAndFreqs={englishLettersFreq}
              symbolsAndFreqsInput={inputFreqs}
              symbolsAndFreqsWiki={wikiFrequencies}
              symbolsAndFanoCodesI={firstFanoCodes}
              symbolsAndHuffmanCodesI={firstHuffmanCodes}
              symbolsAndFanoCodesII={secondFanoCodes}
              symbolsAndHuffmanCodesII={secondHuffmanCodes}
              symbolsAndFanoCodesIII={thirdFanoCodes}
              symbolsAndHuffmanCodesIII={thirdHuffmanCodes}
            />
            <MethodExplanation method={1} symbolsAndFreqs={inputFreqs} />
            <MethodExplanation
              method={2}
              symbolsAndFreqs={englishLettersFreq}
            />
            <MethodExplanation
              method={3}
              symbolsAndFreqs={wikiFreqs}
              wikiName={wikiArticleName}
            />
          </>
        )}
        <FAQSection />
      </div>
    </>
  );
}

export default App;
