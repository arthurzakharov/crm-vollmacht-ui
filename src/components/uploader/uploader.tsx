import { FC, MouseEvent, useState, useEffect } from "react";
import { FileRejection } from "react-dropzone";
import type { ApiStatus } from "../../types";
import React from "react";
import Dropzone from "react-dropzone";
import AnimateHeight from "react-animate-height";
import cn from "classnames";
import { Loader } from "../loader";
import { fileSize, bytesToMegabytes } from "../../utils";
import uploadSrc from "../../assets/png/upload/upload.png";
import trashGraySrc from "../../assets/png/trash-gray/trash-gray.png";
import trashBlueSrc from "../../assets/png/trash-blue/trash-blue.png";
import fileSrc from "../../assets/png/file/file.png";
import checkSrc from "../../assets/png/check/check.png";
import "./uploader.css";

interface Props {
  uploadButtonText: string;
  message: string;
  filesToUpload: File[];
  showTitle: boolean;
  status: ApiStatus;
  maxSize: number;
  onReject: (fileRejection: FileRejection[]) => void;
  onConfirm: () => void;
  setFilesToUpload: (files: File[]) => void;
}

const Uploader: FC<Props> = (props) => {
  const [alreadyUploadedFilesSize, setAlreadyUploadedFilesSize] = useState<number>(0);

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]): void => {
    const newFilesSize = acceptedFiles.reduce((size, file) => size + file.size, 0);
    const exceedMaxSize = alreadyUploadedFilesSize + newFilesSize > props.maxSize;
    if (exceedMaxSize) {
      props.onReject(
        acceptedFiles.map((acceptedFile) => ({
          file: acceptedFile,
          errors: [],
        })),
      );
    }
    if (rejectedFiles.length) {
      props.onReject(rejectedFiles);
    }
    if (!exceedMaxSize && acceptedFiles.length) {
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

  useEffect(() => {
    const totalSize = props.filesToUpload.reduce((totalSize: number, file: File) => {
      return totalSize + file.size;
    }, 0);
    setAlreadyUploadedFilesSize(totalSize);
  }, [props.filesToUpload]);

  return (
    <div className="uploader">
      {props.showTitle ? (
        <p className="uploader__title">
          Perfekt! Übermitteln Sie jetzt bitte <u>das letzte Schreiben</u> das Sie bereits erhalten haben.
        </p>
      ) : null}
      <AnimateHeight height={props.status !== "fulfilled" ? "auto" : 0}>
        <Dropzone
          noKeyboard
          multiple
          maxSize={props.maxSize - alreadyUploadedFilesSize}
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
                <div className="uploader__drop-title" dangerouslySetInnerHTML={{ __html: props.message }} />
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
                  <p>
                    Maximale gesamte Dateigröße: {bytesToMegabytes(props.maxSize)} MB. Unterstützte Dateitypen: PDF,
                    JPG, GIF, PNG.
                  </p>
                </div>
                {!!props.filesToUpload.length && (
                  <>
                    <button type="button" tabIndex={0} className="uploader__button" onClick={onUpload}>
                      {props.uploadButtonText}
                    </button>
                  </>
                )}
              </div>
              {props.status === "pending" && (
                <div className="uploader__loader">
                  <Loader color="primary" />
                </div>
              )}
            </div>
          )}
        </Dropzone>
      </AnimateHeight>
      {props.status === "fulfilled" ? (
        <div className="uploader__uploaded-files">
          <h6>Bereits übermittelt</h6>
          <div>
            <span>Document</span>
            <img alt="check" src={checkSrc} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

Uploader.displayName = "Uploader";

export default Uploader;
