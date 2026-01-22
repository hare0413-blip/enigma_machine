// =======================
// Enigma 簡易実装（完成版）
// =======================

// アルファベット
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ローター配線
const ROTOR_1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const ROTOR_2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const ROTOR_3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

// リフレクター
const REFLECTOR = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// -----------------------
// 逆配線生成
// -----------------------
function invertRotor(rotor) {
  let inverse = Array(26);
  for (let i = 0; i < 26; i++) {
    const letter = rotor[i];
    inverse[ALPHABET.indexOf(letter)] = ALPHABET[i];
  }
  return inverse.join("");
}

const ROTOR_1_INV = invertRotor(ROTOR_1);
const ROTOR_2_INV = invertRotor(ROTOR_2);
const ROTOR_3_INV = invertRotor(ROTOR_3);

// -----------------------
// ローター通過（順方向）
// -----------------------
function forwardThroughRotor(letter, rotor, position) {
  const index = ALPHABET.indexOf(letter);
  const shifted = (index + position) % 26;
  const wiredLetter = rotor[shifted];
  const outputIndex =
    (ALPHABET.indexOf(wiredLetter) - position + 26) % 26;
  return ALPHABET[outputIndex];
}

// -----------------------
// ローター通過（逆方向）
// -----------------------
function backwardThroughRotor(letter, rotorInv, position) {
  const index = ALPHABET.indexOf(letter);
  const shifted = (index + position) % 26;
  const wiredLetter = rotorInv[shifted];
  const outputIndex =
    (ALPHABET.indexOf(wiredL
