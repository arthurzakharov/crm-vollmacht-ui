import React, { FC } from "react";
import "./error-screen.css";

interface Props {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: {
    key: string;
    value: string;
  }[];
}

const ErrorScreen: FC<Props> = (props) => {
  const { title, subtitle, tableTitle, tableRows } = props;
  return (
    <section className="error-screen">
      <h1 className="error-screen__h1">{title}</h1>
      <h2 className="error-screen__h2">{subtitle}</h2>
      <h3 className="error-screen__h3">{tableTitle}</h3>
      <table className="error-screen__table">
        <tbody>
          {tableRows.map(({ key, value }) => (
            <tr key={key}>
              <th className="error-screen__th">{key}</th>
              <td className="error-screen__td" dangerouslySetInnerHTML={{ __html: value }} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

ErrorScreen.displayName = "ErrorScreen";

export default ErrorScreen;
