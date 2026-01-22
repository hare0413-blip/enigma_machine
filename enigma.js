const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ROTOR_I   = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const ROTOR_II  = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const ROTOR_III = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

const REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

let pos1 = 0;
let pos2 = 0;
let pos3 = 0;

function encChar(c) {
  if (!ALPHABET.includes(c)) return c;

  let idx = ALPHABET.indexOf(c);

  // ローター進入
  idx = (idx + pos1) % 26;
  c = ROTOR_I[idx];

  idx = (ALPHABET.indexOf(c) + pos2) % 26;
  c = ROTOR_II[idx];

  idx = (ALPHABET.indexOf(c) + pos3) % 26;
  c = ROTOR_III[idx];

  // リフレクタ
  c = REFLECTOR_B[ALPHABET.indexOf(c)];

  // 逆方向
  idx = (ROTOR_III.indexOf(c) - pos3 + 26) % 26;
  c = ALPHABET[idx];

  idx = (ROTOR_II.indexOf(c) - pos2 + 26) % 26;
  c = ALPHABET[idx];

  idx = (ROTOR_I.indexOf(c) - pos1 + 26) % 26;
  c = ALPHABET[idx];

  // ローター回転
  pos1 = (pos1 + 1) % 26;
  if (pos1 === 0) pos2 = (pos2 + 1) % 26;
  if (pos2 === 0 && pos1 === 0) pos3 = (pos3 + 1) % 26;

  return c;
}

function encrypt() {
  pos1 = ALPHABET.indexOf(
  document.getElementById("pos1").value.toUpperCase()
);
pos2 = ALPHABET.indexOf(
  document.getElementById("pos2").value.toUpperCase()
);
pos3 = ALPHABET.indexOf(
  document.getElementById("pos3").value.toUpperCase()
);
if (pos1 < 0) pos1 = 0;
if (pos2 < 0) pos2 = 0;
if (pos3 < 0) pos3 = 0;

  const input = document.getElementById("inputText").value.toUpperCase();
  let output = "";

  for (let c of input) {
    output += encChar(c);
  }

  document.getElementById("output").textContent = output;
}
