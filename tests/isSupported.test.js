/**
 * @jest-environment jsdom
 */
const { isSupported } = require('../content');

describe('isSupported', () => {
  test('returns true for text input', () => {
    const input = document.createElement('input');
    input.type = 'text';
    expect(isSupported(input)).toBe(true);
  });

  test('returns true for search input', () => {
    const input = document.createElement('input');
    input.type = 'search';
    expect(isSupported(input)).toBe(true);
  });

  test('returns false for password input', () => {
    const input = document.createElement('input');
    input.type = 'password';
    expect(isSupported(input)).toBe(false);
  });

  test('returns true for textarea', () => {
    const textarea = document.createElement('textarea');
    expect(isSupported(textarea)).toBe(true);
  });

  test('returns true for contenteditable element', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'isContentEditable', { value: true });
    expect(isSupported(div)).toBe(true);
  });

  test('returns false for non-editable element', () => {
    const div = document.createElement('div');
    Object.defineProperty(div, 'isContentEditable', { value: false });
    expect(isSupported(div)).toBe(false);
  });
});
