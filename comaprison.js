(function () {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("data");
  if (!raw) return;
 
  const products = JSON.parse(decodeURIComponent(raw));
  const cards = document.getElementById("cards");
  const featureTable = document.getElementById("featureTable");
  const summary = document.getElementById("summary");
 
  // Enriched feature data (can come from backend later)
  const FEATURES = {
    lte: {
      Range: "Medium",
      Bandwidth: "High",
      Power: "High",
      UseCase: "Video, real‑time data"
    },
    lorawan: {
      Range: "Very Long",
      Bandwidth: "Low",
      Power: "Very Low",
      UseCase: "Sensors, remote monitoring"
    }
  };
 
  let cheapest = products[0];
  products.forEach(p => {
    if (p.price < cheapest.price) cheapest = p;
  });
 
  products.forEach(p => {
    const name = p.name.toLowerCase();
    const type = name.includes("lorawan") ? "lorawan" : "lte";
    const f = FEATURES[type];
 
    const card = document.createElement("div");
    card.className = "card";
 
    if (p.name === cheapest.name) {
      const badge = document.createElement("div");
      badge.className = "winner";
      badge.textContent = "Best Value";
      card.appendChild(badge);
    }
 
    card.innerHTML += `
      <h2>${p.name}</h2>
      <div class="vendor">Vendor: ${p.vendor}</div>
      <div class="price">$${p.price}</div>
 
      <div class="info">
        ✅ <strong>Best for:</strong><br />
        ${f.UseCase}
      </div>
 
      <div>
        <span class="tag">Gateway</span>
        <span class="tag">${type.toUpperCase()}</span>
        <span class="tag">${p.vendor}</span>
      </div>
    `;
 
    cards.appendChild(card);
  });
 
  // Build feature table
  featureTable.innerHTML = `
    <tr>
      <th>Feature</th>
      ${products.map(p => `<th>${p.name}</th>`).join("")}
    </tr>
    <tr>
      <td>Connectivity</td>
      ${products.map(p =>
        p.name.toLowerCase().includes("lorawan") ? "<td>LoRaWAN</td>" : "<td>LTE</td>"
      ).join("")}
    </tr>
    <tr>
      <td>Range</td>
      ${products.map(p =>
        p.name.toLowerCase().includes("lorawan") ? "<td>Very Long</td>" : "<td>Medium</td>"
      ).join("")}
    </tr>
    <tr>
      <td>Bandwidth</td>
      ${products.map(p =>
        p.name.toLowerCase().includes("lorawan") ? "<td>Low</td>" : "<td>High</td>"
      ).join("")}
    </tr>
    <tr>
      <td>Power Consumption</td>
      ${products.map(p =>
        p.name.toLowerCase().includes("lorawan") ? "<td>Very Low</td>" : "<td>High</td>"
      ).join("")}
    </tr>
  `;
 
  const lte = products.find(p => p.name.toLowerCase().includes("lte"));
  const lorawan = products.find(p => p.name.toLowerCase().includes("lorawan"));
 
  summary.innerHTML = `
    ✅ <strong>Final Recommendation</strong><br><br>
    🔵 Choose <strong>LTE</strong> if you need high bandwidth, video streaming or real‑time data.<br>
    🟢 Choose <strong>LoRaWAN</strong> if you need long range, low power sensor deployments.<br><br>
    💰 Best value option: <strong>${cheapest.name}</strong> ($${cheapest.price})
  `;
})();
 
