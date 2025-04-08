export function cipher_autokey(
  message: string,
  key: string | null
): [string, string] {
  if (key === null) {
    key = "привет";
  }

  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alphabetLength = alphabet.length;

  const finalKey = (key + message).slice(0, message.length);

  let result = "";
  for (let i = 0; i < message.length; i++) {
    const cipherChar =
      (alphabet.indexOf(message[i]) + alphabet.indexOf(finalKey[i])) %
      alphabetLength;
    result += alphabet[cipherChar];
  }

  return [result, finalKey];
}
