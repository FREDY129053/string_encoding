import React from "react";

export type GroupStep = { groups: string[][] };

interface TableProps {
  steps: GroupStep[];
  data: Record<string, number>;
  codes: Record<string, string>;
}

const mergeDuplicateCells = (
  table: (string | null)[][]
): React.ReactNode[][] => {
  const rows = table.length;
  const cols = table[0].length;

  // Создаем массив для хранения JSX-элементов
  const mergedTable: React.ReactNode[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  // Проходим по каждому столбцу
  for (let col = 0; col < cols; col++) {
    let row = 0;

    while (row < rows) {
      const currentValue = table[row][col];

      // Если значение не пустое, ищем группу одинаковых значений
      if (currentValue !== null) {
        let count = 1;

        // Считаем количество подряд идущих одинаковых значений
        while (row + count < rows && table[row + count][col] === currentValue) {
          count++;
        }

        // Если значение повторяется, объединяем ячейки
        if (count > 1) {
          mergedTable[row][col] = (
            <td
              className="py-2 px-6 text-center border border-gray-300 font-bold"
              key={`${row}-${col}`}
              rowSpan={count}
            >
              {currentValue}
            </td>
          );

          // Пропускаем объединенные ячейки
          for (let i = 1; i < count; i++) {
            mergedTable[row + i][col] = null;
          }

          row += count; // Переходим к следующей группе
        } else {
          // Если значение не повторяется, просто добавляем ячейку
          mergedTable[row][col] = (
            <td
              className="py-2 px-6 text-center border border-gray-300 font-bold"
              key={`${row}-${col}`}
            >
              {currentValue}
            </td>
          );
          row++;
        }
      } else {
        // Если значение пустое, оставляем ячейку как есть
        mergedTable[row][col] = (
          <td
            className="py-2 px-6 text-center border border-gray-300"
            key={`${row}-${col}`}
          ></td>
        );
        row++;
      }
    }
  }

  return mergedTable;
};

const ShannonFanoTable: React.FC<TableProps> = ({ steps, data, codes }) => {
  const symbols = Object.keys(data);
  // Создаём структуру таблицы
  const table: (string | null)[][] = symbols.map(() =>
    Array(steps.length).fill(null)
  );

  steps.forEach((step, colIndex) => {
    step.groups.forEach((group, groupIndex) => {
      group.forEach((symbol) => {
        const rowIndex = symbols.indexOf(symbol);
        table[rowIndex][colIndex] = groupIndex === 0 ? "L" : "R";
      });
    });
  });

  const shiftRowsLeftAndRemoveEmptyColumns = (
    table: (string | null)[][]
  ): (string | null)[][] => {
    const rows = table.length;
    const cols = table[0].length;

    // 1. Сдвигаем непустые значения влево
    for (let row = 0; row < rows; row++) {
      const nonEmptyValues: (string | null)[] = [];
      for (let col = 0; col < cols; col++) {
        if (table[row][col] !== null) {
          nonEmptyValues.push(table[row][col]);
        }
      }
      // Заполняем строку непустыми значениями, начиная с первого столбца
      for (let col = 0; col < cols; col++) {
        table[row][col] =
          col < nonEmptyValues.length ? nonEmptyValues[col] : null;
      }
    }

    // 2. Удаляем полностью пустые столбцы справа
    let lastNonEmptyCol = -1;

    // Находим последний непустой столбец
    for (let col = 0; col < cols; col++) {
      let isEmpty = true;
      for (let row = 0; row < rows; row++) {
        if (table[row][col] !== null) {
          isEmpty = false;
          break;
        }
      }
      if (!isEmpty) {
        lastNonEmptyCol = col;
      }
    }

    // Если все столбцы пустые, оставляем только один столбец
    if (lastNonEmptyCol === -1) {
      return table.map(() => [null]);
    }

    // Обрезаем таблицу до последнего непустого столбца
    return table.map((row) => row.slice(0, lastNonEmptyCol + 1));
  };

  const shiftedTable = shiftRowsLeftAndRemoveEmptyColumns(table);
  const mergedTable = mergeDuplicateCells(shiftedTable);

  return (
    <div className="flex justify-center px-4">
      <div className="overflow-x-auto max-w-screen-lg">
        <table className="border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="sticky left-0 bg-gray-100 py-2 px-6 text-center border-solid border border-gray-300"
                rowSpan={2}
              >
                Symbol
              </th>
              <th
                className="py-2 px-6 text-center border-solid border border-gray-300"
                rowSpan={2}
              >
                Probability
              </th>
              <th
                className="py-2 px-6 text-center border-solid border border-gray-300"
                colSpan={shiftedTable[0].length}
              >
                Division iterations
              </th>
              <th
                className="py-2 px-6 text-center border-solid border border-gray-300"
                rowSpan={2}
              >
                Code
              </th>
            </tr>
            <tr>
              {shiftedTable[0].map((_, index) => (
                <th
                  className="py-2 px-6 text-center border-solid border border-gray-300"
                  key={index}
                >
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mergedTable.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="sticky left-0 bg-gray-100 py-2 px-6 text-center border border-gray-300 bg-gray-100 font-bold">
                  {symbols[rowIndex]}
                </td>
                <td className="py-2 px-6 text-center border border-gray-300">
                  {data[symbols[rowIndex]]}
                </td>
                {row.map((cell) => cell)}
                <td className="py-2 px-6 text-center border border-gray-300">
                  {codes[symbols[rowIndex]]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShannonFanoTable;
