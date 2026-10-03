/** Real table markup with the same readable presentation across commercial pages. */
export default function ServiceTable({ caption, headers, rows, captionHidden = false }: {
  caption: string;
  headers: ReadonlyArray<string>;
  rows: ReadonlyArray<ReadonlyArray<string>>;
  captionHidden?: boolean;
}) {
  return <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto site-card border border-border mt-5">
    <table className="w-full min-w-[560px] text-sm text-left border-collapse leading-relaxed">
      <caption className={captionHidden ? "sr-only" : "text-left p-4 text-muted-foreground"}>{caption}</caption>
      <thead className="bg-muted/30"><tr>{headers.map(header => <th key={header} scope="col" className="p-4 border-b border-border font-semibold">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
        ? <th key={column} scope="row" className="p-4 border-b border-border font-medium align-top">{cell}</th>
        : <td key={column} className="p-4 border-b border-border text-muted-foreground align-top">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
