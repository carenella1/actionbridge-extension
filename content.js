chrome.runtime.onMessage.addListener((message) => {

  if (message.type !== "SHOW_ACTION_ITEMS") return;

  const existing = document.getElementById("actionbridge-card");
  if (existing) existing.remove();

  const card = document.createElement("div");
  card.id = "actionbridge-card";

  card.style.position = "fixed";
  card.style.top = "20px";
  card.style.right = "20px";
  card.style.width = "300px";
  card.style.background = "#111";
  card.style.color = "#fff";
  card.style.padding = "16px";
  card.style.borderRadius = "8px";
  card.style.zIndex = "999999";
  card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  card.style.fontFamily = "Arial";
  const close = document.createElement("div");
close.innerText = "✕";
close.style.position = "absolute";
close.style.top = "8px";
close.style.right = "10px";
close.style.cursor = "pointer";
close.style.fontSize = "14px";

close.onclick = () => card.remove();

card.appendChild(close);

  const title = document.createElement("div");
  title.innerText = "ActionBridge";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "10px";

  card.appendChild(title);

  const items = message.payload.action_items || [];

  if (items.length === 0) {
    const none = document.createElement("div");
    none.innerText = "No action items found.";
    card.appendChild(none);
  }

  items.forEach(item => {

    const row = document.createElement("div");
    row.style.marginBottom = "10px";

    row.innerHTML = `
      <div style="font-weight:600">${item.task}</div>
      <div style="font-size:12px;color:#bbb">
        Owner: ${item.owner || "Unknown"}<br>
        Due: ${item.due || "None"}
      </div>
    `;

    card.appendChild(row);
  });

  document.body.appendChild(card);
setTimeout(() => {
  card.remove();
}, 10000);
});