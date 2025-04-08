export function cipher_playfair(message: string, keyword: string): [string, undefined] {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const matrix_cols = 8;
  const temp_letter = "ъ";

  const key = Array.from(new Set((keyword + alphabet).split(""))).join("");
  const matrix: string[][] = [];

  for (let i = 0; i < key.length; i += matrix_cols) {
    matrix.push(key.slice(i, i + matrix_cols).split(""));
  }

  
  const bigramms_fixed: string[] = [];
  let iter = 0;

  while (iter < message.length) {
    if (iter === message.length - 1) {
      bigramms_fixed.push(message[iter] + temp_letter);
      iter += 1;
    } else if (message[iter] === message[iter + 1]) {
      bigramms_fixed.push(message[iter] + temp_letter);
      iter += 1;
    } else {
      bigramms_fixed.push(message.slice(iter, iter + 2))
      iter += 2;
    }
  }

  let result = "";
  for (const bigram of bigramms_fixed) {
    const [a, b] = bigram.split("");
    const [rowA, colA] = findPosition(a, matrix);
    const [rowB, colB] = findPosition(b, matrix);

    if (rowA === rowB) {
      result +=
        matrix[rowA][(colA + 1) % matrix_cols] +
        matrix[rowB][(colB + 1) % matrix_cols];
    } else if (colA === colB) {
      if (colB !== 0) {
        if (rowA + 1 === matrix.length - 1) {
          result +=
            matrix[(rowA + 2) % matrix.length][colA] +
            matrix[(rowB + 1) % matrix.length][colB];
        } else if (rowB + 1 === matrix.length - 1) {
          result +=
            matrix[(rowA + 1) % matrix.length][colA] +
            matrix[(rowB + 2) % matrix.length][colB];
        } else {
          result +=
            matrix[(rowA + 1) % matrix.length][colA] +
            matrix[(rowB + 1) % matrix.length][colB];
        }
      } else {
        result +=
          matrix[(rowA + 1) % matrix.length][colA] +
          matrix[(rowB + 1) % matrix.length][colB];
}

    } else {
      if (matrix[rowA].length === 1) {
        result += matrix[0][colB] + matrix[rowB][colA];
      } else if (matrix[rowB].length === 1) {
        result += matrix[rowA][colB] + matrix[0][colA];
      } else {
        result += matrix[rowA][colB] + matrix[rowB][colA];
      }
    }
  }

  return [result, undefined];
}

function findPosition(letter: string, matrix: string[][]): number[] {
  for (let i = 0; i < matrix.length; i++) {
    const index = matrix[i].indexOf(letter);
    if (index !== -1) {
      return [i, index];
    }
  }
  return [-1, -1]; // Not found
}

export function get_matrix(keyword: string): string[][] {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const matrix_cols = 8;
  const key = Array.from(new Set((keyword + alphabet).split(""))).join("");
  const matrix: string[][] = [];

  for (let i = 0; i < key.length; i += matrix_cols) {
    matrix.push(key.slice(i, i + matrix_cols).split(""));
  }

  return matrix;
}