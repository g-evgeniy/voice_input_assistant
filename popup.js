document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('apiKey');
  const saveBtn = document.getElementById('save');

  chrome.storage.local.get(['openai_api_key'], (res) => {
    if (res.openai_api_key) input.value = res.openai_api_key;
  });

  saveBtn.onclick = () => {
    chrome.storage.local.set({ openai_api_key: input.value }, () => {
      alert("API token saved!");
    });
  };
});
