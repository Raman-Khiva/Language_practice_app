"use client";

import { useRef } from "react";

export default function AnswerInput({
  value,
  onChange,
  placeholder,
  disabled,
  className,
  handleSubmit
}) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // prevent newline
            handleSubmit();
    }

    if (!textareaRef.current) return;

    const map = {
      a: "á",
      e: "é",
      i: "í",
      o: "ó",
      u: "ú",
      n: "ñ",
      "?": "¿",
      "!": "¡",
    };

    // Works with Left Alt, Right Alt (AltGr), and Ctrl+Alt
    if ((e.altKey || (e.ctrlKey && e.altKey)) && map[e.key]) {
      e.preventDefault();
      insertAtCursor(map[e.key], textareaRef.current);
    }
  };

  const insertAtCursor = (char, textArea) => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const text = textArea.value;
    const newValue = text.slice(0, start) + char + text.slice(end);

    onChange(newValue);

    setTimeout(() => {
      textArea.selectionStart = textArea.selectionEnd = start + char.length;
    }, 0);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}
