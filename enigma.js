// =======================
// Enigma 簡易実装（完成版）
// =======================

// アルファベット
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ローター配線（I / II / III）
const ROTOR_1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const ROTOR_2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const ROTOR_3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

// リフレクター（B）
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
function forward(letter, rotor, position) {
  const index = ALPHABET.indexOf(letter);
  const shifted = (index + position) % 26;
  const wired = rotor[shifted];
  const outIndex = (ALPHABET.indexOf(wired) - position + 26) % 26;
  return ALPHABET[outIndex];
}

// -----------------------
// ローター通過（逆方向）
// -----------------------
function backward(letter, rotorInv, position) {
  const index = ALPHABET.indexOf(letter);
  const shifted = (index + position) % 26;
  const wired = rotorInv[shifted];
  const outIndex = (ALPHABET.indexOf(wired) - position + 26) % 26;
  return ALPHABET[outIndex];
}

// -----------------------
// 1文字処理
// -----------------------
function processChar(letter, pos1, pos2, pos3) {
  if (!ALPHABET.includes(letter)) return letter;

  let c = forward(letter, ROTOR_1, pos1);
  c = forward(c, ROTOR_2, pos2);
  c = forward(c, ROTOR_3, pos3);

  c = REFLECTOR[ALPHABET.indexOf(c)];

  c = backward(c, ROTOR_3_INV, pos3);
  c = backward(c, ROTOR_2_INV, pos2);
  c = backward(c, ROTOR_1_INV, pos1);

  return c;
}

// -----------------------
// 全文処理（暗号化・復号 共通）
// -----------------------
function runEnigmaCore(text, start1, start2, start3) {
  let result = "";

  let pos1 = start1;
  let pos2 = start2;
  let pos3 = start3;

  for (let ch of text) {
    const upper = ch.toUpperCase();
    result += processChar(upper, pos1, pos2, pos3);

    // ローター回転
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
// 暗号化ボタン
// -----------------------
function runEnigma() {
  const text = document.getElementById("inputText").value;

  let pos1 = ALPHABET.indexOf(document.getElementById("pos1").value.toUpperCase());
  let pos2 = ALPHABET.indexOf(document.getElementById("pos2").value.toUpperCase());
  let pos3 = ALPHABET.indexOf(document.getElementById("pos3").value.toUpperCase());

  if (pos1 < 0) pos1 = 0;
  if (pos2 < 0) pos2 = 0;
  if (pos3 < 0) pos3 = 0;

  const output = runEnigmaCore(text, pos1, pos2, pos3);
  document.getElementById("output").textContent = output;
}

// -----------------------
// 復号ボタン（Enigmaは同一処理）
// -----------------------
function decrypt() {
  const text = document.getElementById("decryptInput").value;

  let pos1 = ALPHABET.indexOf(document.getElementById("pos1").value.toUpperCase());
  let pos2 = ALPHABET.indexOf(document.getElementById("pos2").value.toUpperCase());
  let pos3 = ALPHABET.indexOf(document.getElementById("pos3").value.toUpperCase());

  if (pos1 < 0) pos1 = 0;
  if (pos2 < 0) pos2 = 0;
  if (pos3 < 0) pos3 = 0;

  const output = runEnigmaCore(text, pos1, pos2, pos3);
  document.getElementById("decryptOutput").textContent = output;
}
