import React, { useState } from "react";
import { cipher_vigenere } from "./ciphers/vigenere";
import { cipher_vernam } from "./ciphers/vernam";
import { cipher_playfair, get_matrix } from "./ciphers/playfair";
import { cipher_hill } from "./ciphers/hill";
import { cipher_autokey } from "./ciphers/autokey";
import { cipher_autoclave } from "./ciphers/autoclave";

const CiphersHWApp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [autokeyKeyword, setAutokeyKeyword] = useState<string | null>(null);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);
  const [results, setResults] = useState<{ algorithm: string; result: string; matrix?: string[][] }[]>([]);

  const algorithms = [
    { name: "Виженер", func: cipher_vigenere },
    { name: "Вернам", func: cipher_vernam },
    { name: "Плейфер", func: cipher_playfair },
    { name: "Хилл", func: cipher_hill },
    { name: "Автоклав", func: cipher_autoclave },
    { name: "Автоключ", func: cipher_autokey },
  ];

  const handleInputChange = <T extends string | null>(
    value: string,
    setter: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const cleanedValue = value.replace(/[^а-яА-Я]/g, "");
    setter(cleanedValue as T);
  };

  const handleCheckboxChange = (algorithm: string) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithm)
        ? prev.filter((item) => item !== algorithm)
        : [...prev, algorithm]
    );
  };

  const handleEncrypt = () => {
    const calculatedResults = selectedAlgorithms.map((algorithmName) => {
      const algorithm = algorithms.find((alg) => alg.name === algorithmName);
      if (algorithm) {
        try {
          const result =
            algorithm.name === "Автоключ"
              ? algorithm.func(message, autokeyKeyword || "привет")
              : algorithm.func(message, key);

          // Добавляем матрицу для шифра Плейфера
          if (algorithm.name === "Плейфер") {
            const matrix = get_matrix(key);
            return { algorithm: algorithm.name, result, matrix };
          }

          return { algorithm: algorithm.name, result };
        } catch (error) {
          return { algorithm: algorithm.name, result: `Ошибка при шифровании\n${error}` };
        }
      }
      return { algorithm: algorithmName, result: "Алгоритм не найден" };
    });
    setResults(calculatedResults);
  };

    return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Шифрование сообщений</h1>
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Сообщение</label>
          <input
            type="text"
            value={message}
            onChange={(e) => handleInputChange(e.target.value, setMessage)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите сообщение"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Ключ</label>
          <input
            type="text"
            value={key}
            onChange={(e) => handleInputChange(e.target.value, setKey)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите ключ"
          />
        </div>
        {selectedAlgorithms.includes("Автоключ") && (
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">Ключевое слово для "Автоключ"</label>
            <input
              type="text"
              value={autokeyKeyword || ""}
              onChange={(e) => handleInputChange(e.target.value, setAutokeyKeyword)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="привет"
            />
          </div>
        )}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">Выберите алгоритмы шифрования:</p>
          <div className="grid grid-cols-2 gap-4">
            {algorithms.map((algorithm) => (
              <div key={algorithm.name} className="flex items-center">
                <input
                  type="checkbox"
                  id={algorithm.name}
                  checked={selectedAlgorithms.includes(algorithm.name)}
                  onChange={() => handleCheckboxChange(algorithm.name)}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={algorithm.name} className="ml-3 text-gray-700 font-medium">
                  {algorithm.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleEncrypt}
          disabled={!message || !key}
          className={`w-full py-3 px-6 rounded-lg text-lg font-semibold transition ${
            !message || !key
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Зашифровать
        </button>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Результаты:</h2>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={index}
                className="p-6 mb-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm"
              >
                <p className="text-xl font-semibold text-gray-800 mb-4">{result.algorithm}</p>
                <p className="text-gray-700 mb-4">{result.result}</p>
                {result.matrix && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Матрица ключа:</h3>
                    <div className="overflow-x-auto">
                      <table className="border-collapse border border-gray-400 mx-auto">
                        <tbody>
                          {result.matrix.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="border border-gray-400 px-4 py-2 text-center font-mono text-lg"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">Выберите алгоритмы и нажмите "Зашифровать".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CiphersHWApp;