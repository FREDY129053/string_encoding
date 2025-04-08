import React, { useState } from "react";
import { cipher_vigenere } from "./ciphers/vigenere";
import { cipher_vernam } from "./ciphers/vernam";
import { cipher_playfair, get_matrix } from "./ciphers/playfair";
import { cipher_hill } from "./ciphers/hill";
import { cipher_autokey } from "./ciphers/autokey";
import { cipher_autoclave } from "./ciphers/autoclave";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const pythonCodeExamples = {
  Виженер: `
def cipher_vigenere(message: str, keyword: str, is_ru: bool = True) -> str:
  """Реализация шифра Виженера для русского и английского языков.

  Args:
      message (str): текст сообщения
      keyword (str): ключевое слово
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message, keyword = message.lower(), keyword.lower()
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' if is_ru else 'abcdefghijklmnopqrstuvwxyz'
  n = len(alphabet)
  key = "".join([keyword[i % len(keyword)] for i in range(len(message))])
  
  return "".join([alphabet[(alphabet.index(message[i]) + alphabet.index(key[i])) % n] for i in range(len(message))])
  `,

  Вернам: `
def cipher_vernam(message: str, key: str, is_ru: bool = True) -> str:
  """Реализация шифра Вернама для русского и английского языков. 
  Шифр Виженера с использованием XOR.

  Args:
      message (str): сообщение
      key (str): ключевое слово
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message, key = message.lower(), key.lower()
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' if is_ru else 'abcdefghijklmnopqrstuvwxyz'
  n = len(alphabet)
  final_key = "".join([key[i % len(key)] for i in range(len(message))])

  return "".join([alphabet[(alphabet.index(message[i]) ^ alphabet.index(final_key[i])) % n] for i in range(len(message))])
  `,

  Плейфер: `
def cipher_playfair(message: str, keyword: str, is_ru: bool = True) -> str:
  """Реализация шифра Плейфера для русского языка.
  Матрица ключа создается из ключевого слова и алфавита.
  Если в биграмме одинаковые буквы, то добавляется буква 'ъ' или 'x'.
  Если в биграмме одна буква, то добавляется буква 'ъ' или 'x'.

  Args:
      message (str): сообщение
      keyword (str): ключевое слово для построения матрицы ключа
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message, keyword = message.lower(), keyword.lower()
  # В моей реализации все буквы каждого алфавита
  alphabet, matrix_size = ('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', 8) if is_ru else ('abcdefghijklmnopqrstuvwxyz', 5)
  letter = 'ъ' if is_ru else 'x'

  key = "".join(dict.fromkeys(keyword + alphabet))  # Убираем дубликаты из алфавита
  matrix = [list(key[i:i+matrix_size]) for i in range(0, len(key), matrix_size)]  # Матрица для поисков

  prepare_message = []
  i = 0
  while i < len(message):
      if i == len(message) - 1:  # Если остался один символ
          prepare_message.append(message[i] + letter)
          i += 1
      elif message[i] == message[i + 1]:  # Если два символа одинаковые
          prepare_message.append(message[i] + letter)
          i += 1
      else:  # Если символы разные
          prepare_message.append(message[i:i + 2])
          i += 2
          
  # Шифрование текста
  encrypted_message = []
  for a, b in prepare_message:
    row_a, col_a = _find_letter_position_in_matrix(matrix, a)
    row_b, col_b = _find_letter_position_in_matrix(matrix, b)

    if row_a == row_b:
      encrypted_message.append(matrix[row_a][(col_a + 1) % matrix_size] + matrix[row_b][(col_b + 1) % matrix_size])
    elif col_a == col_b:
      # Из-за неполной строки в матрице ключа у неполных колонок нужно добавлять +2, а не +1 для взятия следующего символа
      if col_b != 0:
        if row_a + 1 == len(matrix) - 1:
          encrypted_message.append(matrix[(row_a + 2) % len(matrix)][col_a] + matrix[(row_b + 1) % len(matrix)][col_b])
        elif row_b + 1 == len(matrix) - 1:
          encrypted_message.append(matrix[(row_a + 1) % len(matrix)][col_a] + matrix[(row_b + 2) % len(matrix)][col_b])
        else:
          encrypted_message.append(matrix[(row_a + 1) % len(matrix)][col_a] + matrix[(row_b + 1) % len(matrix)][col_b])
      else:
        encrypted_message.append(matrix[(row_a + 1) % len(matrix)][col_a] + matrix[(row_b + 1) % len(matrix)][col_b])
    else:
      # Условия т.к. для всего алфавита матрица ключа и есть последняя строка, которая состоит из 1 символа
      if len(matrix[row_a]) == 1:
        encrypted_message.append(matrix[0][col_b] + matrix[row_b][col_a])
      elif len(matrix[row_b]) == 1:
        encrypted_message.append(matrix[row_a][col_a] + matrix[0][col_b])
      else:
        encrypted_message.append(matrix[row_a][col_b] + matrix[row_b][col_a])
  
  return "".join(encrypted_message)

def _find_letter_position_in_matrix(matrix: list[list[str]], letter: str) -> tuple[int, int]:
  """Функция поиска строки и колонки буквы в матрице.
  Если буквы нет, то возвращает -1, -1.

  Args:
      matrix (list[list[str]]): матрица букв
      letter (str): буква, которую нужно найти

  Returns:
      tuple[int, int]: строка и столбец буквы
  """
  for i, row in enumerate(matrix):
    for j, el in enumerate(row):
      if el == letter:
        return i, j
  return -1, -1
  `,

  Хилл: `
import numpy as np

def cipher_hill(message: str, keyword: str, is_ru: bool = True) -> str:
  """Реализация шифра Хилла для русского и английского языков.
  Матрица ключа создается из ключевого слова размеров n x n, где n - длина сообщения.
  Шифрование происходит путем умножения матрицы ключа на матрицу сообщения.

  Args:
      message (str): сообщение
      keyword (str): клбчевое слово для построения матрицы ключа
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message, keyword = message.lower(), keyword.lower()
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' if is_ru else 'abcdefghijklmnopqrstuvwxyz'
  n = len(message)

  key = [alphabet.index(keyword[i % len(keyword)]) for i in range(n**2)]
  key_matrix = np.array(key).reshape(n, n)
  message_matrix = np.array([alphabet.index(i) for i in message]).reshape(n, 1)
  result_multiply_matrix = (key_matrix.dot(message_matrix) % np.array([len(alphabet) for _ in range(n)]).reshape(n, 1)).reshape(1, n)

  return "".join([alphabet[i] for i in result_multiply_matrix[0]])
  `,

  Автоклав: `
def cipher_autoclave(message: str, is_ru: bool = True) -> str:
  """Реализация автоклавного шифра для русского и английского языков.
  Шифрование происходит путем сложения двух соседних букв.
  Если буква последняя, то она складывается с первой.

  Args:
      message (str): сообщение
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message = message.lower()
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' if is_ru else 'abcdefghijklmnopqrstuvwxyz'
  n = len(alphabet)

  key = "".join([alphabet[(alphabet.index(message[i]) + alphabet.index(message[i + 1])) % n] for i in range(len(message) - 1)])
  key += alphabet[(alphabet.index(message[-1]) + alphabet.index(message[0])) % n]  # Учитываем последний символ
  
  return "".join([alphabet[(alphabet.index(message[i]) + alphabet.index(key[i])) % n] for i in range(len(message))])
  `,

  Автоключ: `
def cipher_autokey(message: str, keyword: str, is_ru: bool = True) -> str:
  """Реализация шифра с автоключом для русского и английского языков.
  Шифрование просиходит путем добавления ключа к сообщению.

  Args:
      message (str): сообщение
      keyword (str): ключевое слово
      is_ru (bool, optional): переключение алфавита. Defaults to True.

  Returns:
      str: шифртекст
  """
  message, keyword = message.lower(), keyword.lower()
  alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' if is_ru else 'abcdefghijklmnopqrstuvwxyz'
  n = len(alphabet)

  key = (keyword + message)[:len(message)]
  
  return "".join([alphabet[(alphabet.index(message[i]) + alphabet.index(key[i])) % n] for i in range(len(message))])
  `,
};

const CiphersHWApp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [key, setKey] = useState("");
  const [autokeyKeyword, setAutokeyKeyword] = useState<string | null>(null);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([]);
  const [results, setResults] = useState<
    { algorithm: string; result: string; matrix?: string[][] }[]
  >([]);

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
    const cleanedValue = value.replace(/[^а-яА-Яё]/g, "");
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
              ? algorithm.func(
                  message.toLowerCase(),
                  (autokeyKeyword || "ПРИВЕТ").toLowerCase()
                )
              : algorithm.func(message.toLowerCase(), key.toLowerCase());

          // Добавляем матрицу для шифра Плейфера
          if (algorithm.name === "Плейфер") {
            const matrix = get_matrix(key.toLocaleLowerCase());
            return { algorithm: algorithm.name, result, matrix };
          }

          return { algorithm: algorithm.name, result };
        } catch (error) {
          return {
            algorithm: algorithm.name,
            result: `Ошибка при шифровании\n${error}`,
          };
        }
      }
      return { algorithm: algorithmName, result: "Алгоритм не найден" };
    });
    setResults(calculatedResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Шифрование сообщений
      </h1>
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Сообщение
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => handleInputChange(e.target.value, setMessage)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите сообщение"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Ключ
          </label>
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
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Ключевое слово для "Автоключ"
            </label>
            <input
              type="text"
              value={autokeyKeyword || ""}
              onChange={(e) =>
                handleInputChange(e.target.value, setAutokeyKeyword)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Задано слово: ПРИВЕТ"
            />
          </div>
        )}
        <div className="mb-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Выберите алгоритмы шифрования:
          </p>
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
                <label
                  htmlFor={algorithm.name}
                  className="ml-3 text-gray-700 font-medium"
                >
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
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  {result.algorithm}
                </p>
                <p
                  className="text-gray-700 mb-4 break-words whitespace-pre-wrap hover:cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(result.result);
                  }}
                >
                  {result.result}
                </p>
                {result.matrix && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Матрица ключа:
                    </h3>
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
            <p className="text-gray-500 text-lg">
              Выберите алгоритмы и нажмите "Зашифровать".
            </p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Код на Python:
          </h2>
          {Object.entries(pythonCodeExamples).map(([algorithm, code]) => (
            <details key={algorithm} className="mb-4">
              <summary className="cursor-pointer text-lg font-semibold text-blue-600 hover:underline">
                {algorithm}
              </summary>
              <div className="mt-2">
                <SyntaxHighlighter language="python" style={materialDark}>
                  {code.trim()}
                </SyntaxHighlighter>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CiphersHWApp;
