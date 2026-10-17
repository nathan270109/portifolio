const P = [
  { n: "Project Conscious", y: 2026, d: "Aplicação Front-End", c: "Projeto em Equipe", k: ["#2a3cff", "#e8e7e1", "#0e0e0e"], img: "img/project-conscious.jpg", u: "https://github.com/nathan270109/project-conscious", },
];
const S = [
  ["Desenho", "Desenhista amador. Desenhar me ensinou a olhar para proporção, ritmo e espaço vazio, e isso aparece em cada interface que eu monto."],
  ["Fotografia", "Fotógrafo amador, com curso na área. Gosto de trabalhar enquadramento, luz e contraste, e levo esse olhar para o front-end: saber o que mostrar, o que deixar de fora e onde o olho deve pousar."],
  ["Esporte", "Treino, constância e disciplina. Aprendi no esporte a lidar com pressão, a repetir até acertar e a trabalhar em equipe."],
  ["Angular", "Aplicações front-end com componentes, rotas, formulários e consumo de API em TypeScript. Foi com Angular que construí o Project Conscious."],
  ["HTML, CSS e JavaScript", "A base de tudo: páginas semânticas, layouts responsivos e interações escritas à mão, sem excesso de bibliotecas."]
];
const $ = s => document.querySelector(s);
/* arte procedural para as prévias */
function art(p, i) {
  const [a, b, c] = p.k; let s = `<rect width="280" height="360" fill="${a}"/>`;
  if (i % 5 == 0) for (let r = 130; r > 10; r -= 22)s += `<circle cx="140" cy="190" r="${r}" fill="${r / 22 % 2 ? b : c}"/>`;
  if (i % 5 == 1) { for (let x = 0; x < 280; x += 28)s += `<rect x="${x}" y="${(x * 7) % 90}" width="14" height="${360 - (x * 7) % 90}" fill="${b}"/>`; s += `<circle cx="200" cy="90" r="46" fill="${c}"/>` }
  if (i % 5 == 2) { for (let y = 14; y < 360; y += 20)for (let x = 14; x < 280; x += 20) { const r = Math.max(1, 9 * (1 - Math.hypot(x - 90, y - 250) / 260)); s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${b}"/>` } s += `<rect x="170" y="40" width="70" height="70" fill="${c}"/>` }
  if (i % 5 == 3) { s += `<path d="M0 360V200a140 140 0 0 1 280 0v160z" fill="${b}"/><rect x="40" y="40" width="90" height="12" fill="${c}"/><rect x="40" y="62" width="50" height="12" fill="${c}"/>` }
  if (i % 5 == 4) { for (let k = -360; k < 280; k += 18)s += `<line x1="${k}" y1="360" x2="${k + 360}" y2="0" stroke="${b}" stroke-width="${3 + (k + 360) % 9}"/>`; s += `<rect x="0" y="300" width="280" height="60" fill="${c}"/>` }
  return `<svg viewBox="0 0 280 360" preserveAspectRatio="xMidYMid slice">${s}</svg>`
}
const pv = $("#pv"); let mx = 0, my = 0, px = 0, py = 0;
$("#list").innerHTML = P.map((p, i) => `<a href="${p.u || '#'}" target="_blank" rel="noopener" class="row" data-i="${i}"><h3>${p.n}</h3><span class="m">${p.d}</span><span class="m">${p.c}</span><span class="m">${p.y}</span></a>`).join("");
document.querySelectorAll(".row").forEach(r => {
  r.onmouseenter = () => {
    const i = +r.dataset.i, p = P[i];
    pv.innerHTML = p.img ? `<img src="${p.img}" alt="${p.n}">` : art(p, i);
    pv.classList.add("on");
  };
  r.onmouseleave = () => pv.classList.remove("on");
});
addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY });
/* nome: letras reagem ao cursor (eixo de largura da fonte variável) */
document.querySelectorAll(".w").forEach(w => { w.innerHTML = [...w.dataset.t].map((ch, i) => `<span class="l" style="transition-delay:${i * .05}s">${ch}</span>`).join("") });
const L = [...document.querySelectorAll(".l")];
(function loop() {
  px += (mx - px) * .14; py += (my - py) * .14; pv.style.transform = `translate(${px + 28}px,${py - 90}px)`;
  L.forEach(l => {
  const b = l.getBoundingClientRect(), d = Math.hypot(mx - (b.left + b.width / 2), my - (b.top + b.height / 2));
  const f = Math.max(0, 1 - d / (innerWidth * .28));
  l.style.fontVariationSettings = `"wdth" ${78 + f * 44}`;
  l.style.color = `color-mix(in srgb, var(--ac) ${Math.min(1, f * 2.5) * 100}%, var(--fg))`;
});
  requestAnimationFrame(loop)
})();
/* serviços */
$("#svc").innerHTML = S.map((s, i) => `<div class="svc"><button><span class="m">0${i + 1}</span><h4>${s[0]}</h4><span class="pl m">+</span></button><div><p>${s[1]}</p></div></div>`).join("");
document.querySelectorAll(".svc").forEach(el => el.querySelector("button").onclick = () => {
  const o = el.classList.toggle("o"), d = el.querySelector("div"); d.style.maxHeight = o ? d.scrollHeight + "px" : 0
});
/* frase que acende ao rolar */
const st = $("#stt"); st.innerHTML = st.textContent.split(" ").map(w => `<span class="wd">${w}</span>`).join(" ");
const W = [...document.querySelectorAll(".wd")];
function sc() {
  const r = st.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .3)));
  W.forEach((w, i) => w.classList.toggle("on", i / W.length < p))
}
addEventListener("scroll", sc, { passive: true }); sc();
/* relógio, tema, copiar */
const tk = () => $("#clk").textContent = "— " + new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }); tk(); setInterval(tk, 30000);
; $("#th").onclick = () => { const r = document.documentElement, d = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches; r.dataset.theme = d ? "light" : "dark" }
$("#cp").onclick = async e => { const b = e.currentTarget, t = b.textContent; try { await navigator.clipboard.writeText("natiel228@gmail.com"); b.textContent = "copiado ✓" } catch (_) { b.textContent = "natiel228@gmail.com" } setTimeout(() => b.textContent = t, 1600) };
/* preloader */
let n = 0; const cnt = $("#cnt"), pre = $("#pre");
const iv = setInterval(() => {
  n = Math.min(100, n + Math.ceil(Math.random() * 9)); cnt.textContent = n;
  if (n >= 100) { clearInterval(iv); setTimeout(() => { pre.classList.add("done"); document.body.classList.add("go") }, 250) }
}, 50);

/*////////////////////////////*/
/* fundo interativo: grade de pontos que reage ao cursor */
const cv = $("#bg"), cx = cv.getContext("2d");
const GAP = 50, reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
let BW, BH, cFg = "#0e0e0e", cAc = "#ac791a", gx = 0, gy = 0, seen = false, boost = 0;
const trail = [];

function readColors() {
  const s = getComputedStyle(document.documentElement);
  cFg = s.getPropertyValue("--fg").trim();
  cAc = s.getPropertyValue("--ac").trim();
}
function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  BW = innerWidth; BH = innerHeight;
  cv.width = BW * dpr; cv.height = BH * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (reduce) bg(0);
}
addEventListener("resize", resize);
$("#th").addEventListener("click", () => setTimeout(readColors, 0));
matchMedia("(prefers-color-scheme:dark)").addEventListener("change", () => setTimeout(readColors, 0));

addEventListener("pointermove", e => {
  mx = e.clientX; my = e.clientY;
  if (!seen) { seen = true; gx = mx; gy = my; }
  const last = trail[trail.length - 1];
  if (!last || Math.hypot(mx - last.x, my - last.y) > 14) {
    trail.push({ x: mx, y: my, l: 1 });
    if (trail.length > 24) trail.shift();
  }
});
addEventListener("mouseover", e => { boost = e.target.closest(".row") ? 1 : 0; });

function bg(t) {
  cx.clearRect(0, 0, BW, BH);
  const src = [];
  if (seen) {
    gx += (mx - gx) * .12; gy += (my - gy) * .12;
    const R = 150 + boost * 90;
    src.push({ x: gx, y: gy, l: 1, r: R });
    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i].l *= .94;
      if (trail[i].l < .03) trail.splice(i, 1);
      else src.push({ x: trail[i].x, y: trail[i].y, l: trail[i].l * .5, r: R * .7 });
    }
  }
  const off = (scrollY * .15) % GAP;
  for (let j = -1; j * GAP < BH + GAP; j++) {
    for (let i = 0; i * GAP < BW + GAP; i++) {
      const hx = i * GAP + GAP / 2, hy = j * GAP + GAP / 2 - off;
      let ox = 0, oy = 0, k = 0;
      for (const s of src) {
        const dx = hx - s.x, dy = hy - s.y, d = Math.hypot(dx, dy);
        if (d < s.r) {
          const f = (1 - d / s.r) ** 2 * s.l;
          ox += dx / (d || 1) * f * 46; oy += dy / (d || 1) * f * 46; k += f;
        }
      }
      k = Math.min(k, 1);
      const amb = .5 + .5 * Math.sin(t * .0012 + hx * .012 + hy * .017);
      cx.globalAlpha = .18 + amb * .1 + k * .8;
      cx.fillStyle = k > .08 ? cAc : cFg;
      cx.beginPath();
      cx.arc(hx + ox, hy + oy, 1.1 + amb * .5 + k * 3.2, 0, 6.2832);
      cx.fill();
    }
  }
  cx.globalAlpha = 1;
  if (!reduce) requestAnimationFrame(bg);
}
readColors(); resize();
if (!reduce) requestAnimationFrame(bg);