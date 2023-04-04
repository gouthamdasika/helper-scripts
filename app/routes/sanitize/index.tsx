import * as React from 'react';

export default function Sanitize() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [isString, setIsString] = React.useState(false);

  function sanitizeInput() {
    const textarea = textareaRef.current!;
    textarea.value = textarea.value
      .split('\n')
      .map((r) =>
        isString
          ? r
              .trim()
              .replace(/^"/, '')
              .replace(/",{0,1}$/, '')
          : r.trim()
      )
      .join('\n');
  }

  return (
    <div>
      <textarea ref={textareaRef}></textarea>
      <label>
        <input
          type="checkbox"
          checked={isString}
          onChange={(e) => setIsString(e.target.checked)}
        />{' '}
        String data
      </label>
      <button onClick={sanitizeInput}>Sanitize Input</button>
    </div>
  );
}
