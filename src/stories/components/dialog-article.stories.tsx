import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dialog, DialogArticle } from "../../components";
import MaxWidthDecorator from "../decorators/max-width-decorator";
import PositionFixedDecorator from "../decorators/position-fixed-decorator";

type Story = StoryObj<typeof DialogArticle>;

const meta: Meta<typeof DialogArticle> = {
  title: "COMPONENTS/Dialog Article",
  component: DialogArticle,
  decorators: [MaxWidthDecorator, PositionFixedDecorator],
  parameters: {
    MaxWidthDecorator: 600,
  },
  args: {
    hasNoCloseButton: false,
    cancelButton: "",
    confirmButton: "",
    onCancel: fn(),
    onConfirm: fn(),
    onClose: fn(),
  },
  render: (args) => {
    return (
      <Dialog
        dialogs={[
          {
            name: "dialog",
            element: (
              <DialogArticle {...args}>
                <div>
                  <h1>Allgemeine Informationen bei Verträgen im elektronischen Rechtsverkehr</h1>
                  <p>Stand: 01.11.2023</p>
                  <p>
                    Allgemeine Informationen zu Verträgen, die über www.schuldenanalyse-kostenlos.de zwischen der
                    rightmart Berlin Rechtsanwaltsgesellschaft mbH, Sonnenallee 260/262, 12057 Berlin - im Folgenden
                    „Kanzlei“ - und dem Mandanten - im Folgenden „Mandant“ - geschlossen werden.
                  </p>
                  <h2>§ 1 Vertragsgegenstand und -inhalt, Zustandekommen des Vertrages</h2>
                  <p>
                    (1) Gegenstand des Vertrags ist die Beratung und Vertretung des Mandanten bei der außergerichtlichen
                    Schuldenregulierung durch Mitarbeiter der Kanzlei.
                  </p>
                  <p>
                    (2) Der Vertrag kommt zustande mit: <br />
                    <br />
                    rightmart Berlin Rechtsanwaltsgesellschaft mbH <br />
                    Sonnenallee 260/262 <br />
                    12057 Berlin
                  </p>
                  <p>
                    (3) Die Leistung der Kanzlei besteht in der Beratung und Vertretung des Mandanten bei der
                    außergerichtlichen Regulierung seiner Schulden. Der Mandant bestätigt durch Anklicken des Buttons
                    „Kostenpflichtig beauftragen“ seinen verbindlichen Auftrag an die Kanzlei. Mit Verbindlichkeit des
                    Auftrags verpflichtet sich der Mandant zur Begleichung der nach der Vergütungsvereinbarung
                    geschlossenen Vergütung. Sobald die Kanzlei den Auftrag des Mandanten erhalten hat, wird dem
                    Mandanten eine Bestätigung über den Eingang seines Auftrages bei der Kanzlei zugesandt, in der Regel
                    per E-Mail (Eingangsbestätigung).
                  </p>
                  <p>(4) Die Beauftragung über die Webseite der Kanzlei funktioniert wie folgt:</p>
                  <p>
                    <b>Angaben zur Person:</b> <br />
                    Hier trägt der Mandant seine Angaben zur Person einschließlich Geburtsdatum und Geburtsort in die
                    jeweils dafür vorgesehenen Maskenfelder ein. Anschließend klickt der Mandant auf den Button
                    „Weiter“.
                  </p>
                  <p>
                    <b>Kontaktdaten angeben:</b> <br />
                    Nun trägt der Mandant seine Adressdaten ein und klickt wiederum auf „Weiter“.
                  </p>
                  <p>
                    <b>Vollmacht und Auftrag erteilen:</b> <br />
                    Im letzten Schritt erteilt der Mandant der Kanzlei das Mandat und eine Vollmacht. Zugleich erhält
                    der Mandant eine Übersicht seiner Angaben. Sämtliche Angaben in der Auftragsübersicht können
                    jederzeit vor Anklicken des Buttons „Kostenpflichtig beauftragen“ auf der letzten Seite noch einmal
                    überprüft und korrigiert werden. In dem Feld „Digitale Unterschrift“ zeichnet der Mandant seinen
                    Namenszug. Durch Setzen eines Häkchens in die entsprechenden Kästchen bestätigt der Mandant die
                    Kenntnisnahme und das Einverständnis mit der Datenschutzerklärung sowie den Mandatsbedingungen.
                    Durch Anklicken der Schaltfläche "Kostenpflichtig beauftragen" erteilt der Mandant seinen Auftrag an
                    die Kanzlei und die Vollmacht.
                  </p>
                  <p>
                    <b>Nach Absenden des Auftrags:</b> <br />
                    <br />
                    Der Kanzlei schickt daraufhin dem Mandanten eine automatische Empfangsbestätigung per E-Mail zu, in
                    welcher die Vollmacht mit dem dahingehenden Vertretungsauftrag des Mandanten, die
                    Mandatsbedingungen, die abgeschlossene Vergütungsvereinbarung und die Widerrufsbelehrung nochmals
                    aufgeführt werden und die der Mandant über die Funktion „Drucken“ jeweils ausdrucken kann. Die
                    Annahme des Auftrags erfolgt separat nach Prüfung durch die Kanzlei.
                  </p>
                  <h2>§ 2 Vergütung und Zahlungsbedingungen</h2>
                  <p>
                    Die Vergütung der Kanzlei richtet sich nach der mit dem Mandanten abgeschlossenen
                    Vergütungsvereinbarung.
                  </p>
                  <h2>§ 3 Vertragstext</h2>
                  <p>
                    Der Vertragstext wird auf den internen Systemen der Kanzlei gespeichert. Die Auftragsdaten
                    (Vollmacht, ggf. Vergütungsvereinbarung) und die Mandatsbedingungen werden dem Mandanten per E-Mail
                    zugesendet. Nach Abschluss der Beauftragung sind die Auftragsdaten aus Sicherheitsgründen nicht mehr
                    über das Internet zugänglich.
                  </p>
                  <h2>§ 4 Schlussbestimmungen</h2>
                  <p>(1) Die Vertragssprache ist deutsch.</p>
                  <p>
                    (2) Auf Verträge zwischen der Kanzlei und den Mandanten findet das Recht der Bundesrepublik
                    Deutschland Anwendung. Diese Rechtswahl gilt bei Verbrauchern nur, soweit der durch zwingende
                    Bestimmungen des Rechts des Staates des gewöhnlichen Aufenthaltes des Verbrauchers gewährte Schutz
                    dem Mandanten nicht entzogen wird.
                  </p>
                  <p>
                    (3) Sofern es sich beim Mandanten um einen Kaufmann, eine juristische Person des öffentlichen Rechts
                    oder um ein öffentlich-rechtliches Sondervermögen handelt, ist Gerichtsstand für alle Streitigkeiten
                    aus Vertragsverhältnissen zwischen dem Mandanten und der Kanzlei der Sitz der Kanzlei. Dies gilt
                    auch, sofern der Mandant keinen allgemeinen Gerichtsstand in Deutschland oder der EU hat, oder sein
                    Wohnsitz oder sein gewöhnlicher Aufenthalt im Zeitpunkt der Klageerhebung nicht bekannt ist.
                  </p>
                </div>
              </DialogArticle>
            ),
          },
        ]}
        lockTarget="#storybook-root"
        name="dialog"
        position="top"
        size="m"
        onOverlayClick={() => {}}
        onClose={() => {}}
      />
    );
  },
};

export const DialogArticleWithoutCloseButton: Story = {
  name: "Dialog Article Without Close Button",
  args: {
    hasNoCloseButton: false,
  },
};

export const DialogArticleWithCloseButton: Story = {
  name: "Dialog Article With Close Button",
  args: {
    hasNoCloseButton: true,
  },
};

export default meta;
