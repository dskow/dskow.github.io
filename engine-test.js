// Headless test of the Ludus Logicae puzzle engine
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/ludus-logicae.html', 'utf8');
const scriptBody = src.split('<script>')[1].split('</script>')[0];
const engine = scriptBody.split('/* =====================================================================\n   UI')[0];
if (engine.length < 1000) { console.error('FAILED to extract engine'); process.exit(1); }
eval(engine + '\n;globalThis.__E = { DIFFS, DIFF_CFG, generatePuzzle, solve, isP, newState, confirmPair };');
const { DIFFS, DIFF_CFG, generatePuzzle, solve, isP, newState, confirmPair } = globalThis.__E;

let fail = 0;
for (const d of DIFFS) {
  const cfg = DIFF_CFG[d];
  let clueCounts = [], t0 = Date.now();
  for (let n = 0; n < 25; n++) {
    let pz;
    try { pz = generatePuzzle(d); } catch (e) { console.error(d, 'GEN THREW', e.message); fail++; continue; }
    clueCounts.push(pz.clues.length);
    // re-verify: solver reaches exactly the intended unique solution
    const res = solve(pz.clues, pz.K, pz.M, cfg.adv);
    if (!res.solved) { console.error(d, 'NOT SOLVED'); fail++; }
    for (let a = 0; a < pz.K; a++) for (let b = a + 1; b < pz.K; b++)
      for (let e = 0; e < pz.M; e++)
        if (!isP(res.st, a, pz.sol[a][e], b, pz.sol[b][e])) { console.error(d, 'SOLUTION MISMATCH'); fail++; }
    // brute-force uniqueness check: count all assignments consistent with clues (skip when too large)
    const perms = permutations([...Array(pz.M).keys()]);
    const cats = pz.K - 1; // permutations for cats 1..K-1
    const total = Math.pow(perms.length, cats);
    if (total <= 200000) {
      let count = 0;
      for (let t = 0; t < total; t++) {
        let x = t; const assign = [ [...Array(pz.M).keys()] ];
        for (let c = 0; c < cats; c++) { assign.push(perms[x % perms.length]); x = Math.floor(x / perms.length); }
        if (consistent(pz, assign)) count++;
      }
      if (count !== 1) { console.error(d, 'UNIQUENESS FAIL: ' + count + ' solutions'); fail++; }
    }
    // question sanity
    const q = pz.question;
    if (typeof q.text !== 'string' || q.answer == null) { console.error(d, 'BAD QUESTION'); fail++; }
  }
  const avg = (clueCounts.reduce((a, b) => a + b, 0) / clueCounts.length).toFixed(1);
  console.log(`${d}: 25 puzzles ok, clues min/avg/max = ${Math.min(...clueCounts)}/${avg}/${Math.max(...clueCounts)}, ${Date.now() - t0}ms total`);
}

function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of permutations(rest)) out.push([arr[i], ...p]);
  }
  return out;
}
// check a full assignment against the semantic meaning of each clue
function consistent(pz, assign) {
  const link = (a, i, b, j) => { // true if item i of cat a and item j of cat b belong to same entity
    for (let e = 0; e < pz.M; e++) if (assign[a][e] === i) return assign[b][e] === j;
    return false;
  };
  const entOf = (c, i) => { for (let e = 0; e < pz.M; e++) if (assign[c][e] === i) return e; };
  for (const c of pz.clues) {
    // replay clue semantics from a fresh state restricted to this assignment:
    // simpler: apply clue eliminations to a state seeded with ONLY this assignment; if it eliminates any seeded pair, inconsistent.
    if (c.dyn) continue; // cmp clues checked below via seeded propagation
    const st = newState(pz.K, pz.M);
    c.apply(st);
    // static clues: every pair eliminated by the clue must not be used by this assignment
    for (let a = 0; a < pz.K; a++) for (let b = a + 1; b < pz.K; b++)
      for (let i = 0; i < pz.M; i++) for (let j = 0; j < pz.M; j++)
        if (!st.p[a + '|' + b][i][j] && link(a, i, b, j)) return false;
  }
  // dynamic (cmp) clues: run full propagation seeded with the assignment confirmed; contradiction => inconsistent
  const st2 = newState(pz.K, pz.M);
  for (let a = 0; a < pz.K; a++) for (let b = a + 1; b < pz.K; b++)
    for (let e = 0; e < pz.M; e++) confirmPair(st2, a, assign[a][e], b, assign[b][e]);
  for (const c of pz.clues) if (c.dyn) { c.apply(st2); if (st2.bad) return false; }
  // any elimination of a seeded pair => inconsistent
  for (let a = 0; a < pz.K; a++) for (let b = a + 1; b < pz.K; b++)
    for (let e = 0; e < pz.M; e++)
      if (!st2.p[a + '|' + b][assign[a][e]][assign[b][e]]) return false;
  return true;
}

console.log(fail === 0 ? 'ALL TESTS PASSED' : fail + ' FAILURES');
process.exit(fail === 0 ? 0 : 1);
