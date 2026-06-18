const chatBox = document.getElementById("chat-box");
// ✅ Main function
async function sendMessage() {
    
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (!message) return;

  

  // 🧑 User message
  chatBox.innerHTML += `<div class="message user">${message}</div>`;
  input.value = "";

  if (!chats[currentChat]) {
    chats[currentChat] = [];
  }

  chats[currentChat].push({
    user: message,
    bot: "..."
  });

  saveChats();
  renderChats();
  // image support 
const imageInput = document.getElementById("image-input");
if (imageInput.files.length > 0) {
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    chatBox.innerHTML += `
      <div class="message user">
        <img src="${e.target.result}" style="max-width:150px; border-radius:10px;">
      </div>
    `;
    chats[currentChat].push({
    user: `<img src="${e.target.result}" style="max-width:150px; border-radius:10px;">`,
    bot: ""
  });

  saveChats();
  renderChats();
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  reader.readAsDataURL(file);
}
  chatBox.scrollTop = chatBox.scrollHeight;

  // 🤖 Typing...
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot";
  typingDiv.innerText = "Typing...";
  chatBox.appendChild(typingDiv);

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen3:4b",
        prompt: `Answer shortly in 2-3 lines only . Do not show thinking . ${message}`,
        stream: false
      })
    });

    const data = await response.json();
    let history = JSON.parse(localStorage.getItem("chatHistory")) || [];
    history.push({
    user: message,
    bot: data.response
    });
    localStorage.setItem("chatHistory", JSON.stringify(history));

    typingDiv.remove();

    chatBox.innerHTML += `<div class="message bot">${data.response}</div>`;

  } catch (error) {
    typingDiv.remove();
    chatBox.innerHTML += `<div class="message bot">❌ AI not running</div>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}


// ✅ Enter key support (keep this at bottom)
document.getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
       }
  });
  window.onload = function () {
 // let history = JSON.parse(localStorage.getItem("chatHistory")) || [];

  chatBox.innerHTML = ""; // clear first

  history.forEach(chat => {
    chatBox.innerHTML += `<div class="message user">${chat.user}</div>`;
    chatBox.innerHTML += `<div class="message bot">${chat.bot}</div>`;
  });

  chatBox.scrollTop = chatBox.scrollHeight;
};
// 👇 PASTE BELOW window.onload

let chats = JSON.parse(localStorage.getItem("allChats")) || {};
let currentChat = "chat1";

function newChat() {
  currentChat = "chat" + Date.now();
  chats[currentChat] = [];
  saveChats();
  renderChats();
  document.getElementById("chat-box").innerHTML = "";
}

function saveChats() {
  localStorage.setItem("allChats", JSON.stringify(chats));
}

function renderChats() {
  const chatList = document.getElementById("chat-list");
  chatList.innerHTML = "";

  Object.keys(chats).forEach(id => {
    const div = document.createElement("div");
    div.className = "chat-item";
    div.innerText = id;
    div.onclick = () => loadChat(id);
    chatList.appendChild(div);
  });
}

function loadChat(id) {
  currentChat = id;
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";

  chats[id].forEach(chat => {
    chatBox.innerHTML += `<div class="message user">${chat.user}</div>`;
    chatBox.innerHTML += `<div class="message bot">${chat.bot}</div>`;
  });
 renderChats();
}