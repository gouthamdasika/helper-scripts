import * as React from 'react';

import type { LinksFunction } from 'remix';

import duplicateStylesUrl from '../../../styles/duplicates.css';

type Duplicates = Record<string, number>;

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: duplicateStylesUrl,
    },
  ];
};

export default function Duplicates() {
  const [duplicates, setDuplicates] = React.useState<Duplicates>({});
  const [uniques, setUniques] = React.useState<string[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    const data = textAreaRef.current?.value!;
    const splitData = data.split('\n');

    let dups: Duplicates = {};

    splitData.forEach((email) => {
      email = email.trim();
      if (dups[email]) ++dups[email];
      else dups[email] = 1;
    });

    setTotalCount(Object.keys(dups).length);

    dups = Object.fromEntries(
      Object.entries(dups).filter(([email, count]) => count > 1)
    );

    setDuplicates(dups);
  };

  const getUnique = () => {
    setUniques(Array.from(new Set(textAreaRef.current?.value.split('\n'))));
  };

  return (
    <div className="App">
      <h1>Duplicate Data Comparison</h1>
      <div className="grid">
        <div>
          <textarea wrap="off" ref={textAreaRef}></textarea>
          <button onClick={handleClick}>Check Duplicates</button>
          <button onClick={getUnique}>Check Unique</button>
        </div>
        <div>
          {uniques.length > 0 ? (
            <table border={1}>
              <thead>
                <tr>
                  <th>Uniques</th>
                </tr>
              </thead>
              <tbody>
                {uniques.map((u) => (
                  <tr>
                    <td>{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <DuplicateDisplay duplicates={duplicates} />

              <p>
                Total Count - <b>{totalCount}</b>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DuplicateDisplay({ duplicates }: { duplicates: Duplicates }) {
  const duplicateContent = Object.entries(duplicates).map(([email, count]) => (
    <tr key={email}>
      <td>{email}</td>
      <td>{count}</td>
    </tr>
  ));

  if (duplicateContent.length === 0) {
    return null;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Email</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>{duplicateContent}</tbody>
    </table>
  );
}
