let micButton = null;
let translateButton = null;
let mediaRecorder;
let mediaStream = null;  // Store stream to stop tracks
let audioChunks = [];
let targetElement = null;
let recording = false;

// Only allow input[type=text|search], textarea, and contenteditable elements
function isSupported(el) {
    if (el.tagName === 'TEXTAREA') {
        return true;
    }
    if (el.tagName === 'INPUT') {
        const allowed = ['text', 'search'];
        return allowed.includes(el.type);
    }
    return el.isContentEditable;
}

function createMicButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.title = 'Speech to text';
    btn.innerHTML = '<img' +
        ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAKeElEQVR4nL2ae4xcd3XHP+f87r0zs37Ejm0Ijh2/ltjZBYJCiytBlVAeoQQqCrJLBW0QUQNCKFKESh1imB3HMUGpIhD0IREIaknb2CV/8KhaBMQpVWsCtAHVwbEdr720NbVNCMk+Zube3zn9486MZ12/dnaVI6323rv3/s73+zvndx6/3woLKi7sRQHYLnHWn+qugDJGRMQXVu9CSAmwJ+4uw5/1pRvve/aKkbpns97d62Gh1MqCjLLXA9sl1uuuf7Wo+F3Qd0fXV2OsAFBhSpRDGvgHafLI0bvlNHVXGjjMzxrzJ9ABf01j+nU6VHtAEl6LgEfAOkoECCAK1ubnEuO94zuSz+MuJYLBScyPQAf8+t3FH1KRL0qiibUo+saWUoHhqOG4BFKtgk3al29t7bqt8dSYsA8blMTgBLZ5YJ/EDbub7/Bq5WsY5oYJnNe//awydyjCIjL7VfEXx3emH+6O9eIRcBeA4T0vrMzDooMadKUVGFJGIMHFuzPah7yn1A2HQmuaMlP8zvhd6de71pwrFL30K+eRMQIiXlC7M9R0lRUUCEFwEcA7jg0uIl3n8B4NFwVUibi57t621wMHebFcyAXEf+POidr/rFz9tGZhjRfmiErfYELpKrMf9BSWFhJwEjQr8t88vCP7l0GsMHcLbCu/+d9VV71Ck7CWwhDRs9jFxTrg+2en409iuBjipZsRNcVzD28B4ODcJ3TuBEZKJSFJN0sFXDTSBzYW7hU3iEZhsxSIO6Tunpph3nsmJlwLwOjc3WiwNQA0C5Z2/MIdCArPzxgf+XXju7cr37zVuaoWaVsZltzxTNwffZ/zrQ84yzL3wrqxVpcCDLIOBibQXalICaIwWJo6732NsOZKGL1aeMsmZ6oNqmAOqcKGlcLGlwYqSg+tYAPjGJxAT0xUYKoNW9fA1VcKx09H8gJuGRFSrFy8UgajZgHt3LpJGqBMcgPKAhBQF4G8MH57cznknz9uHD4FWzcIw8vdZwoQKeOoACoLVYQtkAXaEVbV4K3XQTTjm0eVAxNOUOWNm1ymWy7asYCcD7nbwHzmTSCI+nQbtl7tvPQK4cf/BeOTwhMTJaa3jwhVde8mhf7k0Lt0HbiYG5iAWez6NjEat2xxDOVrP3EkwhPHnV9MRl5zjbBlhTGd43pOpuveig7uUcmgH2oIIkArwupFzps2l4XQHTcJH3xdyeyKGiRBedOw8cN/RULtbD3RP+U+j47g8gjs9cA+YKRPr5Wx/7kW3LLFWbVUOfmccfAkVFKlKGDi2cjWjcbbrhM+e8A8en/o7EPdf1N3ZbRjke2XLrMvj0B/fdJpHa2j1M146xYA5cF/i9QfU1m5GJ/O4ZrFcOAOeMXVwnUrnIkXBJEyJ3jfcjbri6INmVNIvTgBd2H7Pl13/bt2yOLweib5zPG7+RYNSCRKswi8fLnz9hEBjP3jwsuuFIYSWCbI6cng3x+PvHlEeOcI3P89WJJBlpaZuadHOot4DB/OfKRI7T6JnBTRjx3bwfOdxXZeS1yYwDYPiMRNu/36osZuTaFQ27Btn47ugyhgKjBViNz6CDLVxo8+D5lCEV0QoZLBJ78jfOlHyOmZ4Enm8t6/Kf3o2TaeaK/rLC0s4sUe362L9R0A/lx8GpIHGPMEep3e5VpgHwCtmAdtB4uFuoiu+PEEy4EzaRJOR+D5tso/juNBYFEGJTwBR7IAE5PKkV/hiSK1RNj/M3FwWZRKLxKJ0+oZHVtrUxpJcIfKhfFdisDebYZAZq0TeRyaUmUJyopo+cuBM5q3n84ts0TRZZVycZrPyrBuDpUA1VASc4elGYB47PZrggexowAb7/eXxNw2ElEUwcNPgYtWqRfOAyKOuxxrLDktwiEUpIKYpb8FkLSzQ5gdIoXomLnPSrLdfsAdooOVPaZEd7GzcNQLBOyfwaWYKV4rFb0ScGtbu6o8CVy0Sr14IhsrK2ER/SdJwXOI0X7vxronTzWkjfvDkiJ46cpdA3R8SM6GzC4lKMOiC2CSoNbiyPKZ5HEQV9F3iwIJIs6Th+7iBO5ysch0qUxcfmjtr1rL3AtiqOkrf5ZyM0BozzxoU3ZGEgLuxqycdG7UKO+ld20mKSLwqR81ZHr4Pl/jmb7LWkRNEMUfEcQ7k3hBuTiBhhh11xM7K09am+9qheCORbVd9brrscaSU8H1DklRVCN9nnOBEcvc4eQ6pKlN8o31rf1/DZAXxU6tsFQUtxl7TlozXwFgjIv2yJeuhTpZUTTWLYLnFGFIb3gojXcDHPu4/K1NcY/WSEUQnPxcAn030Z1CF5HZFD+sCe9/vPGGYtPu/GapJrdb09paISH6Z441lpyi7smlNoIvr4jq7BasvSd+MblCP2DT1pJUK0zznuOfkEcA1t1b3ClZ2C0pQ94GL3sWK71QBQiagSt4i69WpvnQ4YacWburNRqqyX5ElyGE2LIjy7NTN/xk8qoZxvCFIeAujCGbh1g0bRxIKox4TtsV9Ty+f+LjycMAa3a1Xhmy5A7gbQRdrUmpwUvLzaA8QR7/8sTdyd8BrN/T3kqaPirCao/kLojM5K8/Xs++f7m7dZdfxtZdaYht2uPDUe17kuhVVpBLQuoFf+YF907slJMAmz/tS3LhVeJsxKmKFCdVk4OH/1jGAUbq/5lNV7Z8iDR8CmfIjVxSUpuKfzDxyeQrc9kfmlsd3pmVTbt8NFbsG5LpemvS0iqV2OLnKvZQQP/+mT+Rfz/f59fdM72uGWq3uPJHUuHV3qJASVwwWtx2Yqd8mbonNOS8ZcP8CUBvPWyu++qZqn0pGdKbY7MMjFIBa2E4R0TsGXf+29A8wVaa6jrMRrWqiz0Hj8RQI8SWjfu03T7RSL9N/bGExhsuG/xgBIB+/9ywxz/iwT4mma71ovR3USDt/IayjijKHwQ0A89pivOFyi9pHLpPfjHo5u7gmwP1ujI25oj4urovk2q81ST8Pm43hIqm1gaMvFOxBclQj0C0Z0AfzeChIzvkp+dOyItHoCvnzNy1f+pbiPH6tstHCfprHgG3X6bqn/BqeHJVwX8c+KjM9L7dhs3n0G9htmfKMBv6F9/aPfHBMKS30QaPdvjEXWFz7/26J4DNtfs6nwzc1M+ScgZL8OWJpAGVbgp2VG+sj1cff2p9zj58LlHmUrIABPrOhgFOIrwM52j/K8hx1sPIfqF+kzDqwkGEUXyQhdsvC0BAnO2zCq7y+l5vQ7c8NTvRCM356/r/Mg8C5UnNjY95MvGD4ibVZLEb4lYEAYvYsMeeYZZce79vNy8ihlhILAUtiuLMM3el++dDYB5htNxeuabCw2Ex7/GcsrbtFNSeAxHDTVAVyehtxXun85EEfJpPj++QHYOG0sFPKUV8uH5mabuy4oympBYpuvv8jiLnlupeHsp0j/9wolZJrcWJiR2y3jsWnSuUwfZGRZy669GxFS+o2OdMaFrELeJmuJu5RYtmFt2IZhbNrHzu5uUJk7lFe8GNBxx6Z29zhjIQgXNk0z3Ta1uFVCTBaUIrqXqlaJZjV6FVVN2LptSSqgM0gWoVkiaTxxpyaiEwDC7n/JfKi/39/wE5fyYxH73BQQAAAABJRU5ErkJggg==" alt="Mic Icon" style="width:24px;height:24px;">';
    btn.style.marginLeft = '4px';
    btn.style.padding = '2px 4px';
    btn.style.borderRadius = '50%';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.2)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1.0)';
    btn.onclick = toggleRecording;
    return btn;
}

function toggleRecording() {
    if (!recording) {
        startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        mediaStream = stream;  // Keep stream reference
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        mediaRecorder.start();
        recording = true;
        // micButton.innerText = '■';
        micButton.style.background = '#f88';
    } catch (err) {
        console.error('Microphone access denied', err);
        alert('It was not possible to access the microphone.');
    }
}

function stopRecording() {
    if (mediaRecorder && recording) {
        mediaRecorder.stop();
        recording = false;
        // micButton.innerText = '🎙';
        micButton.style.background = '#ffffffdd';

        // Stop all audio tracks to release microphone
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
            const formData = new FormData();
            formData.append("file", audioBlob, "audio.webm");
            formData.append("model", "whisper-1");

            // disable until transcription finishes
                if (micButton) micButton.disabled = true;

            chrome.storage.local.get(['openai_api_key'], async (res) => {
                const apiKey = res.openai_api_key;
                if (!apiKey) {
                    alert('Please set your API token in the extension settings.');
                    if (micButton) micButton.disabled = false;
                    return;
                }

                try {
                    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
                        method: "POST",
                        headers: {"Authorization": `Bearer ${apiKey}`},
                        body: formData
                    });
                    const data = await response.json();
                    const text = data.text;
                    if (targetElement) targetElement.value += text;
                } catch (err) {
                    console.error('Transcription error:', err);
                    alert('Audio transcription error.');
                } finally {
                    if (micButton) micButton.disabled = false;
                }
            });
        };
    }
}

function createTranslateButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.marginLeft = '4px';
    btn.style.padding = '2px 4px';
    btn.style.color = '#fff';
    btn.title = 'Translate text';
    btn.innerText = '🌐';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1.0)';
    btn.onclick = () => {
        if (!targetElement) return;
        const text = targetElement.value.trim();
        if (!text) return;
        btn.disabled = true;
        const isRussian = /[\u0400-\u04FF]/.test(text);
        const prompt = isRussian
            ? `Translate the following Russian text to English:\n\n${text}`
            : `Translate the following English text to Russian:\n\n${text}`;
        chrome.storage.local.get(['openai_api_key'], async (res) => {
            const apiKey = res.openai_api_key;
            if (!apiKey) {
                alert('Please set your API token in the extension settings.');
                btn.disabled = false;
                return;
            }
            try {
                const resApi = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({model: 'gpt-4o-mini', messages: [{role: 'user', content: prompt}]}),
                });
                const data = await resApi.json();
                const translated = data.choices?.[0]?.message?.content.trim();
                if (translated) targetElement.value = translated;
            } catch (err) {
                console.error('Translation error:', err);
                alert('The error of translating the text.');
            } finally {
                btn.disabled = false;
            }
        });
    };
    return btn;
}

function attachButtons(el) {
    removeButtons();
    targetElement = el;
    micButton = createMicButton();
    translateButton = createTranslateButton();
    el.parentNode.insertBefore(micButton, el.nextSibling);
    el.parentNode.insertBefore(translateButton, micButton.nextSibling);
}

function removeButtons() {
    [micButton, translateButton].forEach(btn => {
        if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
    });
    micButton = null;
    translateButton = null;
    targetElement = null;
}

function onFocusIn(e) {
    const el = e.target;
    if (el === micButton || el === translateButton) return;
    if (isSupported(el)) attachButtons(el);
    else removeButtons();
}

document.addEventListener('focusin', onFocusIn);

document.addEventListener('click', (e) => {
    if (targetElement &&
        !targetElement.contains(e.target) &&
        micButton && !micButton.contains(e.target) &&
        translateButton && !translateButton.contains(e.target)) {
        removeButtons();
    }
});
