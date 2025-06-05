# Voice Assistant

A Chrome extension that adds speech-to-text and Russian-English translation capabilities to text input fields across websites using OpenAI's API services.

## Features

- **Speech-to-Text**: Record your voice and convert it to text directly in any input field
- **Translation**: One-click translation between Russian and English
- **Universal Support**: Works on text inputs, search fields, textareas, and contenteditable elements
- **Non-intrusive Design**: Buttons appear only when an input field is focused

## How It Works

1. Click on any text field on a webpage
2. Two buttons will appear next to the field:
    - 🎤 Microphone button for speech-to-text
    - 🌐 Globe button for translation
3. Click the microphone to record your voice and have it transcribed
4. Click the globe to translate existing text between Russian and English

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the folder containing this extension
5. The extension icon will appear in your browser toolbar

## Setup

1. Click on the extension icon in your browser toolbar
2. Enter your OpenAI API key in the field provided
3. Click "Save" to store your API key

## Requirements

- Chrome browser (version 88 or later recommended)
- OpenAI API key with access to:
    - Whisper API (for speech recognition)
    - GPT models (for translation)

## Testing

Run `npm test` to execute the Jest test suite.

## Privacy

This extension:
- Only activates on input fields when they're focused
- Sends audio data to OpenAI only during active recording
- Sends text for translation only when the translate button is clicked
- Stores your API key locally in your browser
- Does not collect or store any user data

## License

MIT License
