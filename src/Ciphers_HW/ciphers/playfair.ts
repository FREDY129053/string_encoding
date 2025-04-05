export function cipher_playfair(message: string, keyword: string): string {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const matrix_cols = 8;
  const temp_letter = "ъ";

  const key = Array.from(new Set((keyword + alphabet).split(""))).join("");
  const matrix: string[][] = [];

  for (let i = 0; i < key.length; i += matrix_cols) {
    matrix.push(key.slice(i, i + matrix_cols).split(""));
  }

  const bigramms: string[] = [];
  for (let i = 0; i < message.length; i += 2) {
    bigramms.push(message.slice(i, i + 2));
  }
  const bigramms_fixed: string[] = [];
  let temp = "";
  for (const bigramm of bigramms) {
    if (temp) {
      bigramms_fixed.push(temp + bigramm[0]);
      temp = "";
    } else if (bigramm.length === 1) {
      bigramms_fixed.push(bigramm + temp_letter);
    } else if (bigramm[0] === bigramm[1]) {
      bigramms_fixed.push(bigramm[0] + temp_letter);
      temp = bigramm[1];
    } else {
      bigramms_fixed.push(bigramm);
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
      result +=
        matrix[(rowA + 1) % matrix.length][colA] +
        matrix[(rowB + 1) % matrix.length][colB];
    } else {
      if (matrix[rowA].length === 1) {
        result += matrix[0][colB] + matrix[rowB][colA];
      } else {
        result += matrix[rowA][colB] + matrix[rowB][colA];
      }
    }
  }

  return result;
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