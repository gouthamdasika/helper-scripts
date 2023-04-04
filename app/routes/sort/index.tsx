import * as React from 'react';

export default function Sort() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [sorted, setSorted] = React.useState<string[]>([]);

  function sortResults() {
    const values = textareaRef.current?.value.split('\n')!;

    values.sort((a, b) => a - b);
    setSorted(values);
  }

  return (
    <div>
      <textarea ref={textareaRef}></textarea>
      <button onClick={sortResults}>Sort</button>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Sorted - {sorted.length}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((diff, index) => (
              <tr key={index}>
                <td>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
