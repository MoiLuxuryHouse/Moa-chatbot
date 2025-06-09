const chatBox = document.createElement("div");
chatBox.style.position = "fixed";
chatBox.style.bottom = "20px";
chatBox.style.right = "20px";
chatBox.style.width = "300px";
chatBox.style.height = "400px";
chatBox.style.background = "#ffffff";
chatBox.style.border = "1px solid #ccc";
chatBox.style.borderRadius = "12px";
chatBox.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
chatBox.style.display = "flex";
chatBox.style.flexDirection = "column";
chatBox.style.zIndex = "9999";

chatBox.innerHTML = `
  <div style="background:#064; color:white; padding:10px; font-weight:bold; border-radius:12px 12px 0 0;">
    Móa spjall
  </div>
  <div id="chatLog" style="flex:1; padding:10px; overflow-y:auto; font-size:14px;">
    <div><strong>Móa:</strong> Hæ! Ég heiti Móa – hvað viltu vita um Ísland eða Mói Luxury House? 🇮🇸</div>
  </div>
  <div style="padding:10px; border-top:1px solid #ccc;">
    <input id="chatInput" type="text" style="width:80%;" placeholder="Skrifaðu spurningu..." />
    <button onclick="sendChat()">Senda</button>
  </div>
`;

document.body.appendChild(chatBox);

function sendChat() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  const chatLog = document.getElementById("chatLog");
  chatLog.innerHTML += `<div><strong>Þú:</strong> ${message}</div>`;
  input.value = "";

  fetch("https://script.google.com/macros/s/AKfycbxnqm4KhhjOUdWnfDxd1jbKb-jTf9denD2GdGe_LvObtA29Ttfz8AG8jUsnG-iDEFW7/exec", {
    method: "POST",
    body: JSON.stringify({ question: message }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      chatLog.innerHTML += `<div><strong>Móa:</strong> ${data.answer}</div>`;
      chatLog.scrollTop = chatLog.scrollHeight;
    })
    .catch(err => {
      chatLog.innerHTML += `<div><strong>Móa:</strong> Villa við að fá svar 😢</div>`;
    });
}
