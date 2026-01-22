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
  const outputIndex = (ALPHABET.indexOf(wiredLetter) - position + 26) % 26;
  return ALPHABET[outputIndex];
}

// -----------------------
// ローター通過（逆方向）
// -----------------------
function backwardThroughRotor(letter, rotorInv, position) {
  const index = ALPHABET.indexOf(letter);
  const shifted = (index + position) % 26;
  const wiredLetter = rotorInv[shifted];
  const outputIndex = (ALPHABET.indexOf(wiredLetter) - position + 26) % 26;
  return ALPHABET[outputIndex];
}

// -----------------------
// 1文字暗号化
// -----------------------
function encryptChar(letter, pos1, pos2, pos3) {
  if (!ALPHABET.includes(letter)) return letter;

  // → ローター前進
  let c = forwardThroughRotor(letter, ROTOR_1, pos1);
  c = forwardThroughRotor(c, ROTOR_2, pos2);
  c = forwardThroughRotor(c, ROTOR_3, pos3);

  // → リフレクター
  c = REFLECTOR[ALPHABET.indexOf(c)];

  // ← ローター逆戻り
  c = backwardThroughRotor(c, ROTOR_3_INV, pos3);
  c = backwardThroughRotor(c, ROTOR_2_INV, pos2);
  c = backwardThroughRotor(c, ROTOR_1_INV, pos1);

  return c;
}

// -----------------------
// 全文暗号化
// -----------------------
function encrypt(text, start1, start2, start3) {
  let result = "";

  let pos1 = start1;
  let pos2 = start2;
  let pos3 = start3;

  for (let char of text) {
    const upper = char.toUpperCase();

    const encrypted = encryptChar(upper, pos1, pos2, pos3);
    result += encrypted;

    // --- ローター回転（簡易）---
    pos1 = (pos1 + 1) % 26;
    if (pos1 === 0) {
      pos2 = (pos2 + 1) % 26;
      if (pos2 === 0) {
        pos3 = (pos3 + 1) % 26;
      }
    }
  }

  return result;
}

// -----------------------
// ボタン処理
// -----------------------
function runEnigma() {
  const text = document.getElementById("inputText").value;

  const r1 = document.getElementById("rotor1").value;
  const r2 = document.getElementById("rotor2").value;
  const r3 = document.getElementById("rotor3").value;

  const start1 = ALPHABET.indexOf(r1);
  const start2 = ALPHABET.indexOf(r2);
  const start3 = ALPHABET.indexOf(r3);

  const output = encrypt(text, start1, start2, start3);

  document.getElementById("outputText").value = output;
}

function decrypt() {
  // encrypt()と同じく初期位置を設定
  pos1 = ALPHABET.indexOf(document.getElementById("pos1").value.toUpperCase());
  pos2 = ALPHABET.indexOf(document.getElementById("pos2").value.toUpperCase());
  pos3 = ALPHABET.indexOf(document.getElementById("pos3").value.toUpperCase());

  if (pos1 < 0) pos1 = 0;
  if (pos2 < 0) pos2 = 0;
  if (pos3 < 0) pos3 = 0;

  const input = document.getElementById("decryptInput").value.toUpperCase();
  let output = "";

  for (let c of input) {
    output += encChar(c);
  }

  document.getElementById("decryptOutput").textContent = output;
}
