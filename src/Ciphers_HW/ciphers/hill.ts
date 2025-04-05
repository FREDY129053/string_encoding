export function cipher_hill(message: string, keyword: string): string {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alphabetLength = alphabet.length;

  const key: number[] = [];
  for (let i = 0; i < message.length ** 2; i++) {
    key.push(alphabet.indexOf(keyword[i % keyword.length]));
  }

  const keyMatrix: number[][] = [];
  for (let i = 0; i < message.length; i++) {
    keyMatrix.push(key.slice(i * message.length, (i + 1) * message.length));
  }

  const messageMatrix: number[][] = [];
  for (const char of message) {
    messageMatrix.push([alphabet.indexOf(char)]);
  }

  const result_matrix_multiplied = multiplyMatrices(keyMatrix, messageMatrix);
  for (let i = 0; i < result_matrix_multiplied.length; i++) {
    for (let j = 0; j < result_matrix_multiplied[i].length; j++) {
      result_matrix_multiplied[i][j] %= alphabetLength;
    }
  }

  let result = "";
  for (let i = 0; i < result_matrix_multiplied.length; i++) {
    for (let j = 0; j < result_matrix_multiplied[i].length; j++) {
      result += alphabet[result_matrix_multiplied[i][j]];
    }
  }

  return result;
}

function multiplyMatrices(
  matrix1: number[][],
  matrix2: number[][]
): number[][] {
  const rows1 = matrix1.length;
  const columns1 = matrix1[0].length;
  const rows2 = matrix2.length;
  const columns2 = matrix2[0].length;

  if (columns1 !== rows2) {
    console.log(
      "Error: Number of columns in the first matrix must be equal to the number of rows in the second matrix."
    );
    const res: number[][] = [];
    return res;
  }

  const result: number[][] = [];
  for (let i = 0; i < rows1; i++) {
    result[i] = [];
    for (let j = 0; j < columns2; j++) {
      result[i][j] = 0;
    }
  }

  for (let i = 0; i < rows1; i++) {
    for (let j = 0; j < columns2; j++) {
      for (let k = 0; k < columns1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  return result;
}
