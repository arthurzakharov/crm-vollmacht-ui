import type { FC, PropsWithChildren } from "react";
import React from "react";
import "./form-row.css";

const FormRow: FC<PropsWithChildren> = (props) => <div className="form-row">{props.children}</div>;

FormRow.displayName = "FormRow";

export default FormRow;
