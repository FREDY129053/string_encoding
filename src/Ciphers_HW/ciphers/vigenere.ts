export function cipher_vigenere(message: string, keyword: string): string {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alphabetLength = alphabet.length;
  let key = "";

  for (let i = 0; i < message.length; i++) {
    key += keyword[i % keyword.length];
  }

  let result = "";

  for (let i = 0; i < message.length; i++) {
    const cipherChar =
      (alphabet.indexOf(message[i]) + alphabet.indexOf(key[i])) %
      alphabetLength;
    result += alphabet[cipherChar];
  }

  return result;
}
