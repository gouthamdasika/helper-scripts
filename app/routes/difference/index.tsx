import * as React from 'react';

export default function Difference() {
  const parentRef = React.useRef<HTMLTextAreaElement>(null);
  const childRef = React.useRef<HTMLTextAreaElement>(null);
  const [differences, setDifferences] = React.useState<string[]>([]);
  const [matches, setMatches] = React.useState<string[]>([]);

  function checkDifferences() {
    const initialRecords = parentRef.current?.value
      .split('\n')
      .map((r) => r.toLowerCase())!;
    const childRecords = childRef.current?.value
      .split('\n')
      .map((r) => r.toLowerCase())!;

    setDifferences(initialRecords.filter((r) => !childRecords.includes(r)));
  }

  function checkMatches() {
    const initialRecords = parentRef.current?.value
      .split('\n')
      .map((r) => r.toLowerCase())!;
    const childRecords = childRef.current?.value
      .split('\n')
      .map((r) => r.toLowerCase())!;

    setMatches(initialRecords.filter((r) => childRecords.includes(r)));
  }

  return (
    <div>
      <textarea ref={parentRef}></textarea>
      <textarea ref={childRef}></textarea>
      <button onClick={checkDifferences}>Check Difference</button>
      <button onClick={checkMatches}>Check Matches</button>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Differences - {differences.length}</th>
            </tr>
          </thead>
          <tbody>
            {differences.map((diff, index) => (
              <tr key={index}>
                <td>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table border="1">
          <thead>
            <tr>
              <th>Matches - {matches.length}</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>{match}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
