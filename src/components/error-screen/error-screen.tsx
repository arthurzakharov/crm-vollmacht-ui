import React, { FC } from "react";
import "./error-screen.css";

type TableRow = {
  key: string;
  value: string;
};

interface Props {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: TableRow[];
}

const ErrorScreen: FC<Props> = (props) => (
  <section className="error-screen">
    <h1 className="error-screen__h1">{props.title}</h1>
    <h2 className="error-screen__h2">{props.subtitle}</h2>
    <h3 className="error-screen__h3">{props.tableTitle}</h3>
    <table className="error-screen__table">
      <tbody>
        {props.tableRows.map((tableRow: TableRow) => (
          <tr key={tableRow.key}>
            <th className="error-screen__th">{tableRow.key}</th>
            <td className="error-screen__td" dangerouslySetInnerHTML={{ __html: tableRow.value }} />
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

ErrorScreen.displayName = "ErrorScreen";

export default ErrorScreen;
