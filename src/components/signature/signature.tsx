import type { FC, MouseEvent } from "react";
import type { ApiStatus, FieldStatus } from "../../types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import SignatureCanvas from "react-signature-canvas";
import Loader from "../loader";
import StatusIcon from "../status-icon";
import useDimensions from "../../hooks/useDimensions";
import checkLineSrc from "../../assets/png/check-line/check-line.png";
import "./signature.css";

const HEADER = "data:image/png;base64,";

interface Props {
  submitClickCount: number;
  status: ApiStatus;
  fullName: string;
  signature: string;
  saveSignature: (signature: string) => void;
  fetchSignature: () => void;
  color?: string;
}

const Signature: FC<Props> = (props) => {
  const [autoMode, toggleAutoMode] = useState<boolean>(true);
  const [pad, setPad] = useState<SignatureCanvas | null>(null);
  const [signatureAuto, setSignatureAuto] = useState<string>("");
  const [signatureManual, setSignatureManual] = useState<string>("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { ref, dimensions } = useDimensions<HTMLDivElement>(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!!props.fullName && !props.signature) {
      props.fetchSignature();
    }
  }, []);

  useEffect(() => {
    if (props.status === "fulfilled" && props.signature) {
      setSignatureAuto(props.signature);
    }
  }, [props.status]);

  useEffect(() => {
    saveDrawSignatureToStore();
  }, [signatureManual]);

  useEffect(() => {
    resetSingPad();
  }, [width, height]);

  useEffect(() => {
    setSize({
      width: Number.parseInt(String(dimensions.width) || "0"),
      height: Number.parseInt(String(dimensions.height) || "0"),
    });
  }, [dimensions]);

  useLayoutEffect(() => {
    if (!autoMode) {
      drawSignatureToCanvas();
    }
  }, [autoMode]);

  useLayoutEffect(() => {
    drawSignatureToCanvas();
  }, [size]);

  const cutStringWhile = (str: string, char: string): string => {
    let result = str;
    while (result.slice(-1) === char) {
      result = result.slice(0, -1);
    }
    return result;
  };

  const goToDrawMode = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.target as HTMLButtonElement;
    const drawnSignature = cutStringWhile(signatureManual, "=");
    props.saveSignature(signatureManual ? drawnSignature.substring(HEADER.length) + "==" : "");
    toggleAutoMode(false);
    if (button) button.blur();
  };

  const goToAutoMode = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.target as HTMLButtonElement;
    if (button) button.blur();
    props.saveSignature(signatureAuto);
    toggleAutoMode(true);
  };

  const onSingPadDrawEnd = (): void => {
    if (pad) {
      const signatureFromPad = pad.getCanvas().toDataURL("image/png");
      setSignatureManual(signatureFromPad);
    }
  };

  const clearSingPad = (e: MouseEvent<HTMLButtonElement>): void => {
    const button = e.target as HTMLButtonElement;
    if (button) button.blur();
    if (pad) {
      pad.clear();
      setSignatureManual("");
      props.saveSignature("");
    }
  };

  const resetSingPad = (): void => {
    setSize({ width: 0, height: 0 });
  };

  const drawSignatureToCanvas = (): void => {
    if (size.width && size.height) {
      if (pad) {
        pad.fromDataURL(signatureManual, {
          width: size.width,
          height: size.height,
        });
      }
    }
  };

  const saveDrawSignatureToStore = (): void => {
    if (signatureManual) {
      const drawnSignature = cutStringWhile(signatureManual, "=");
      props.saveSignature(drawnSignature.substring(HEADER.length) + "==");
    }
  };

  const isSuccessVisibleInAutoMode = (): boolean => {
    return props.signature !== "";
  };

  const isStatusIconVisibleInManualMode = (): boolean => {
    return props.signature !== "" || (props.signature === "" && props.submitClickCount !== 0);
  };

  const getStatusIconStateInManualMode = (): FieldStatus => {
    if (props.signature !== "") return "success";
    if (props.signature === "" && props.submitClickCount !== 0) return "error";
    return "success";
  };

  return (
    <div id="signature" className="signature">
      <h6 className="signature__title">Wir haben eine digitale Signatur für Sie generiert.</h6>
      <div className="signature__main">
        <div className="signature__content">
          <span className="signature__x">X</span>
          {autoMode ? (
            <div className="signature__panel">
              {signatureAuto !== "" ? (
                <img className="signature__image" src={HEADER + signatureAuto} alt="signature" />
              ) : (
                <div className="signature__loader">
                  <Loader color="orange" />
                </div>
              )}
              <hr className="signature__line" />
              <div className="signature__status">
                {isSuccessVisibleInAutoMode() ? <StatusIcon status="success" size="l" /> : null}
              </div>
            </div>
          ) : (
            <div className="signature__board" ref={ref}>
              <SignatureCanvas
                penColor={props.color || "blue"}
                dotSize={2}
                minWidth={0.25}
                maxWidth={2.75}
                throttle={12}
                canvasProps={{
                  width: size.width,
                  height: size.height,
                }}
                ref={(ref) => setPad(ref)}
                clearOnResize
                onEnd={onSingPadDrawEnd}
              />
              <hr className="signature__line" />
              <div className="signature__status">
                {isStatusIconVisibleInManualMode() ? (
                  <StatusIcon status={getStatusIconStateInManualMode()} size="l" />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="signature__footer">
        {autoMode ? (
          <div className="signature__manual">
            <div className="signature__note">
              <img alt="check-line" src={checkLineSrc} className="signature__icon" />
              <span className="signature__text">Diese Unterschrift ist ausreichend</span>
            </div>
            <button type="button" tabIndex={0} className="signature__manual-button" onClick={goToDrawMode}>
              per Hand/Maus unterschreiben
            </button>
          </div>
        ) : (
          <div className="signature__auto">
            <button type="button" tabIndex={0} className="signature__auto-button" onClick={goToAutoMode}>
              Unterschrift digital generieren
            </button>
            <button type="button" tabIndex={0} className="signature__auto-button" onClick={clearSingPad}>
              Unterschrift zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Signature.displayName = "Signature";

export default Signature;
