export function cipher_autoclave(message: string) : [string, string] {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const alphabetLength = alphabet.length;

  let key = "";
  for (let i = 0; i < message.length - 1; i++) {
    const cipherChar =
      (alphabet.indexOf(message[i]) + alphabet.indexOf(message[i + 1])) %
      alphabetLength;
    key += alphabet[cipherChar];
  }
  key += alphabet[(alphabet.indexOf(message[message.length - 1]) + alphabet.indexOf(message[0])) % alphabetLength];
 
  let result = "";
  for (let i = 0; i < message.length; i++) {
    const cipherChar =
      (alphabet.indexOf(message[i]) + alphabet.indexOf(key[i])) %
      alphabetLength;
    result += alphabet[cipherChar];
  }
  
  return [result, key];
}