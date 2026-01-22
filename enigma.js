const A = "A".charCodeAt(0);

function encChar(c, p1, p2, p3) {
  if (!/[A-Z]/.test(c)) return c; // ③ スペース・記号はそのまま

  let n = c.charCodeAt(0) - A;
  n = (n + p1 + p2 + p3) % 26;
  return String.fromCharCode(A + n);
}

function runEnigma() {
  const text = document.getElementById("inputText").value.toUpperCase();
  const outElem = document.getElementById("output");

  let p1 = document.getElementById("pos1").value.charCodeAt(0) - A;
  let p2 = document.getElementById("pos2").value.charCodeAt(0) - A;
  let p3 = document.getElementById("pos3").value.charCodeAt(0) - A;

  let out = "";

  for (let c of text) {
    out += encChar(c, p1, p2, p3);

    p1 = (p1 + 1) % 26;
    if (p1 === 0) p2 = (p2 + 1) % 26;
    if (p1 === 0 && p2 === 0) p3 = (p3 + 1) % 26;
  }

  outElem.textContent = out;
}
