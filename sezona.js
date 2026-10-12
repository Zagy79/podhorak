/* =========================================================
   TERMÍNY MOŠTÁRNY – jediné místo, které se každý rok mění.
   Stačí přepsat rok a data (formát RRRR-MM-DD).
   Proběhlé termíny se na webu samy přeškrtnou a po posledním
   termínu se zobrazí, že sezóna skončila.
   ========================================================= */
const SEZONA = {
  rok: 2026,
  terminy: ["2026-10-04", "2026-10-11", "2026-10-18"],
  poznamka: "Otevřeno vždy v neděli, jen po rezervaci."
};

/* ---- níže už není potřeba nic měnit ---- */
(function () {
  const mesice = ["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"];
  const mesiceKratce = ["led","úno","bře","dub","kvě","čvn","čvc","srp","zář","říj","lis","pro"];
  const dnes = new Date(); dnes.setHours(0, 0, 0, 0);
  const data = SEZONA.terminy.map(t => { const d = new Date(t + "T00:00:00"); return d; });
  const budouci = data.filter(d => d >= dnes);
  const dalsi = budouci[0];
  const fmt = d => d.getDate() + ". " + mesice[d.getMonth()];

  // Pruh na úvodní stránce
  const pruh = document.getElementById("sezona-pruh");
  if (pruh) {
    if (dalsi) {
      const jeDnes = dalsi.getTime() === dnes.getTime();
      pruh.innerHTML = "<strong>Moštárna " + SEZONA.rok + ":</strong> " +
        (jeDnes ? "dnes máme otevřeno!" : "nejbližší termín je neděle " + fmt(dalsi) + ".") +
        (budouci.length > 1 ? " Další: " + budouci.slice(1).map(fmt).join(", ") + "." : "");
    } else {
      pruh.innerHTML = "<strong>Sezóna moštování " + SEZONA.rok + " skončila.</strong> Děkujeme a těšíme se na podzim!";
    }
  }

  // Termíny na stránce moštárny
  const box = document.getElementById("terminy");
  if (box) {
    box.innerHTML = data.map(d => {
      let cls = "date";
      if (d < dnes) cls += " past";
      else if (dalsi && d.getTime() === dalsi.getTime()) cls += " next";
      return '<div class="' + cls + '"><div class="d">' + d.getDate() + '.</div><div class="m">' +
        mesiceKratce[d.getMonth()] + "</div></div>";
    }).join("");
    const pozn = document.getElementById("terminy-poznamka");
    if (pozn) {
      pozn.textContent = dalsi ? SEZONA.poznamka
        : "Letošní sezóna skončila. Termíny na příští rok zveřejníme koncem léta.";
    }
    const rok = document.getElementById("sezona-rok");
    if (rok) rok.textContent = SEZONA.rok;
  }
})();
