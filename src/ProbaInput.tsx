interface ProbabilityInputProps {
  seqLen: number | "";
  setSeqLen: (value: number | "") => void;
  probabilities: Record<string, number>;
  setProbabilities: (updated: Record<string, number>) => void;
  error: string | null;
  remaining: number;
}

export default function ProbabilityInput({
  seqLen,
  setSeqLen,
  probabilities,
  setProbabilities,
  error,
  remaining,
}: ProbabilityInputProps) {
  const handleInputChange = (
    oldChar: string,
    newValue: string | number,
    type: "char" | "prob"
  ) => {
    const updatedProbabilities = { ...probabilities };

    if (type === "char") {
      const newChar =
        typeof newValue === "string" ? newValue.toUpperCase() : "";
      // if (newValue === "" || /^[a-zA-Z]$/.test(newValue as string)) {
      if (newChar === "" || /^[A-Z]$/.test(newChar as string)) {
        const oldProb = updatedProbabilities[oldChar];
        delete updatedProbabilities[oldChar];
        updatedProbabilities[newChar as string] = oldProb;
      }
    } else {
      const numValue =
        typeof newValue === "string" ? parseFloat(newValue) : newValue;
      if (!isNaN(numValue) && numValue >= 0 && numValue < 1) {
        updatedProbabilities[oldChar] = numValue;
      }
    }

    setProbabilities(updatedProbabilities);
  };

  const handleAddField = () => {
    setProbabilities({ ...probabilities, "": 0 });
  };

  const handleDelete = (char: string) => {
    const updatedProbabilities = { ...probabilities };
    delete updatedProbabilities[char];
    setProbabilities(updatedProbabilities);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      {/* Блок для ввода длины последовательности */}
      <div className="relative z-0 w-64 mb-5 group lg:mb-0 mx-auto">
        <input
          type="number"
          placeholder=" "
          name="floating_text"
          max={5}
          min={1}
          value={seqLen}
          onChange={(e) =>
            setSeqLen(e.target.value ? parseInt(e.target.value) : "")
          }
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label
          htmlFor="floating_text"
          className="peer-focus:font-medium absolute text-sm text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter the length of the sequences
        </label>
      </div>

      {/* Блок для ввода букв и вероятностей */}
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="flex flex-col gap-3 w-72">
          {Object.entries(probabilities).map(([char, prob], index) => (
            <div key={index} className="flex gap-3 items-center justify-center">
              {/* Input для буквы */}
              <input
                type="text"
                maxLength={1}
                value={char}
                onChange={(e) =>
                  handleInputChange(char, e.target.value, "char")
                }
                className="border border-gray-300 rounded-lg p-2 text-center w-20 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Letter"
              />
              {/* Input для вероятности */}
              <input
                type="number"
                step="0.01"
                value={prob}
                onChange={(e) =>
                  handleInputChange(char, e.target.value, "prob")
                }
                className="border border-gray-300 rounded-lg p-2 text-center w-24 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Probability"
              />
              {/* Кнопка удаления */}
              <button
                onClick={() => handleDelete(char)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Сообщение об ошибке или оставшейся сумме */}
        {remaining === 0 || error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <p className="text-gray-600 text-sm">
            Remaining probability to distribute: {remaining.toFixed(2)}
          </p>
        )}

        {/* Кнопка добавления новой пары буква-вероятность */}
        {remaining > 0 && (
          <button
            onClick={handleAddField}
            disabled={error !== null}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Letter
          </button>
        )}
      </div>
    </div>
  );
}
