It is necessary to change the application's behavior when the microphone button is pressed
so that the same voice recording controls appear as described below. These controls should have the following 
functionality:
the cross means canceling further voice recording as well as canceling its submission to the API.
The checkmark means stopping the recording and sending it to the API,
as currently happens when the microphone button is pressed again.
---

### 📌 Context

This is a section of a user interface that appears to be a control panel for a voice session or a recording feature. The panel contains a set of icons and indicators related to the recording status.

---

### 📋 Panel Structure (from left to right)

1. **Microphone icon with "AI" label**

    * Style: Blue microphone icon with a white "AI" label inside a small blue circle overlay.
    * Purpose: To activate voice interaction or indicate that AI-assisted recording is enabled.

2. **Globe icon**

    * Style: Blue globe icon.
    * Purpose: Likely used to select language or region settings.

3. **Red cross icon**

    * Style: Red circle with a white "X" in the center.
    * Purpose: To stop the recording, cancel the session, or reset the current action.

4. **Red dot**

    * Purpose: Indicator that recording is currently in progress.

5. **Timer**

    * Format: `00:00`, shows the current duration of the recording.
    * Currently at zero, which may indicate the start of a recording or a paused state.

6. **Green checkmark icon**

    * Style: Green circular arrow with a checkmark inside.
    * Purpose: To confirm or finish the recording.

7. **Plus icon**

    * Style: Simple black or gray plus sign.
    * Purpose: To add a new element (e.g., another recording or session).

---

### 💡 Key Implementation Notes for the UI

* All elements should be aligned horizontally in a single row.
* Even spacing between the icons is important.
* Each element should function as an interactive button with hover effects.
* Color scheme:

    * Microphone and globe: blue (primary action).
    * Cross: red (cancel/stop action).
    * Dot: bright red (indicates active recording).
    * Checkmark: green (confirm/complete action).
    * Plus: black or gray, neutral (add action).

---

Let me know if you want a sample HTML/CSS layout for this or UX suggestions!





HTML/CSS implementation of the described UI panel:

---

### ✅ **HTML**

```html
<div class="va-recording-panel">
    <div class="va-recording-panel__mic">
    <button class="icon mic">
    <span class="ai-label">AI</span>
    🎤
  </button>
    </div>
  <button class="icon globe">🌐</button>
  <button class="icon cancel">❌</button>
  <div class="recording-indicator">🔴</div>
  <div class="timer">00:00</div>
  <button class="icon confirm">✅</button>
  <button class="icon add">➕</button>
</div>
```

```html
<div class="recording-panel">
  <button class="icon mic">
    <span class="ai-label">AI</span>
    🎤
  </button>
  <button class="icon globe">🌐</button>
  <button class="icon cancel">❌</button>
  <div class="recording-indicator">🔴</div>
  <div class="timer">00:00</div>
  <button class="icon confirm">✅</button>
</div>
<div class="rc-message-box__audio-message-container">
    <div class="rc-message-box__audio-message rc-message-box__audio-message--recording">
        <div class="rc-message-box__icon rc-message-box__audio-message-cancel"><i aria-hidden="true"
                                                                                  class="rcx-box rcx-box--full rcx-icon--name-circle-cross rcx-icon rcx-css-i37o9p"></i>
        </div>
        <div class="rc-message-box__audio-message-timer"><span
                class="rc-message-box__audio-message-timer-dot"></span><span
                class="rc-message-box__audio-message-timer-text">05:04</span></div>
        <div class="rc-message-box__icon rc-message-box__audio-message-done"><i aria-hidden="true"
                                                                                class="rcx-box rcx-box--full rcx-icon--name-circle-check rcx-icon rcx-css-i37o9p"></i>
        </div>
    </div>
</div>
```

---

### 🎨 **CSS**

```css
.recording-panel {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  font-family: sans-serif;
}

.icon {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  padding: 4px;
  transition: transform 0.2s;
}

.icon:hover {
  transform: scale(1.1);
}

.mic {
  color: #007bff; /* Blue */
}

.mic .ai-label {
  position: absolute;
  top: -5px;
  right: -8px;
  background: #007bff;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 50%;
}

.globe {
  color: #007bff; /* Blue */
}

.cancel {
  color: #dc3545; /* Red */
}

.recording-indicator {
  font-size: 18px;
  color: #ff0000;
}

.timer {
  font-size: 16px;
  font-weight: bold;
  color: #000;
  width: 50px;
  text-align: center;
}

.confirm {
  color: #28a745; /* Green */
}

.add {
  color: #333;
}
```
```css
    color: var(--primary-font-color);
    font-variant-numeric: tabular-nums;
    -webkit-font-smoothing: antialiased;
    font-family: var(--rcx-font-family-sans,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Helvetica Neue","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Meiryo UI",Arial,sans-serif);
    cursor: text;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    border: 0 solid;
    font-size: 100%;
```
---

This layout:

* Is responsive and uses modern CSS practices.
* Uses emojis for simplicity (can easily be replaced with SVG or icon fonts like FontAwesome).
* Includes hover effects.
* Positions the `AI` label properly over the mic icon.

Let me know if you want a version with SVGs or tied to some framework like React or Vue.
