import React, { FC } from "react";
import "./error-404.css";

interface Props {
  title: string;
  subtitle: string;
  tableTitle: string;
  tableRows: {
    key: string;
    value: string;
  }[];
}

const Error404: FC<Props> = (props) => {
  const { title, subtitle, tableTitle, tableRows } = props;
  return (
    <section className="error-404">
      <h1 className="error-404__h1">{title}</h1>
      <h2 className="error-404__h2">{subtitle}</h2>
      <h3 className="error-404__h3">{tableTitle}</h3>
      <table className="error-404__table">
        <tbody>
          {tableRows.map(({ key, value }) => (
            <tr key={key}>
              <th className="error-404__th">{key}</th>
              <td className="error-404__td" dangerouslySetInnerHTML={{ __html: value }} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Error404;
