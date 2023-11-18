import type { FC, MouseEvent } from "react";
import type { FileRejection } from "react-dropzone";
import type { ApiStatus } from "../../types";
import React from "react";
import Dropzone from "react-dropzone";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import Loader from "../loader";
import { fileSize } from "../../utils";
import uploadSrc from "../../assets/png/upload/upload.png";
import trashGraySrc from "../../assets/png/trash-gray/trash-gray.png";
import trashBlueSrc from "../../assets/png/trash-blue/trash-blue.png";
import fileSrc from "../../assets/png/file/file.png";
import checkSrc from "../../assets/png/check/check.png";
import "./uploader.css";

interface Props {
  areFilesUploaded: boolean;
  filesToUpload: File[];
  status: ApiStatus;
  onReject: (fileRejection: FileRejection[]) => void;
  onConfirm: () => void;
  setFilesToUpload: (files: File[]) => void;
}

const Uploader: FC<Props> = (props) => {
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]): void => {
    if (rejectedFiles.length) {
      props.onReject(rejectedFiles);
    }
    if (acceptedFiles.length) {
      const newFilesToUpload = acceptedFiles.map((acceptedFile: File, i: number): File => {
        const type = acceptedFile.type;
        const count = props.filesToUpload.length + i + 1;
        const hasSuchName = props.filesToUpload.find((file: File) => file.name === `${count}-${acceptedFile.name}`);
        const fileName = `${hasSuchName ? count + 1 : count}-${acceptedFile.name}`;
        return new File([acceptedFile], fileName, { type });
      });
      props.setFilesToUpload([...props.filesToUpload, ...newFilesToUpload]);
    }
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>, fileName: string): void => {
    e.stopPropagation();
    const updatedFilesToUpload = props.filesToUpload.filter((file: File) => file.name !== fileName);
    props.setFilesToUpload(updatedFilesToUpload);
  };

  const onUpload = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    props.onConfirm();
  };

  return (
    <div className="uploader">
      {props.areFilesUploaded ? (
        <p className="uploader__title">
          Perfekt! Übermitteln Sie jetzt bitte <u>das letzte Schreiben</u> das Sie bereits erhalten haben.
        </p>
      ) : null}
      <AnimateHeight height={!props.areFilesUploaded ? "auto" : 0}>
        <Dropzone
          noKeyboard
          multiple
          maxSize={6000000}
          accept={{
            "image/gif": [".gif"],
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "application/pdf": [".pdf"],
          }}
          onDrop={(acceptedFiles, rejectedFiles) => onDrop(acceptedFiles, rejectedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="uploader__content">
              <input {...getInputProps()} />
              <div className={cn("uploader__wrapper", { "uploader__wrapper--pending": props.status === "pending" })}>
                <div className="uploader__drop-title">
                  <strong>Zuletzt erhaltenes Behördenschreiben</strong>
                  <br />
                  (alle Vorder- und Rückseiten sofern bedruckt)
                </div>
                <ul className="uploader__file-list">
                  {props.filesToUpload.map((file: File, i: number) => (
                    <li key={`${file.name}-${i}`} className="uploader__file">
                      <img className="uploader__file-icon" alt="file" src={fileSrc} />
                      <span className="uploader__file-text">
                        {file.name} - {fileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        tabIndex={0}
                        className="uploader__delete"
                        onClick={(e) => onDelete(e, file.name)}
                      >
                        <img alt="trash" src={trashGraySrc} />
                        <img alt="trash" src={trashBlueSrc} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="uploader__drop-area">
                  <img alt="upload" src={uploadSrc} />
                  <p>
                    Datei(en) auswählen /<br />
                    Dokumentenseite abfotografieren
                  </p>
                  <p>Maximale Dateigröße pro Datei: 6 MB. Unterstützte Dateitypen: PDF, JPG, GIF, PNG.</p>
                </div>
                {!!props.filesToUpload.length && (
                  <>
                    <button type="button" tabIndex={0} className="uploader__button" onClick={onUpload}>
                      Behördenschreiben übermitteln
                    </button>
                  </>
                )}
              </div>
              {props.status === "pending" && (
                <div className="uploader__loader">
                  <Loader color="orange" />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </AnimateHeight>
      {props.areFilesUploaded && (
        <div className="uploader__uploaded-files">
          <h6>Bereits übermittelt</h6>
          <div>
            <span>Document</span>
            <img alt="check" src={checkSrc} />
          </div>
        </div>
      )}
    </div>
  );
};

Uploader.displayName = "Uploader";

export default Uploader;
