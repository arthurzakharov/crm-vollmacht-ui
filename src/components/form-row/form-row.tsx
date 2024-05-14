import React, { FC, PropsWithChildren } from "react";
import "./form-row.css";

export const FormRow: FC<PropsWithChildren> = (props) => <div className="form-row">{props.children}</div>;
