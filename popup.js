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
// 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
