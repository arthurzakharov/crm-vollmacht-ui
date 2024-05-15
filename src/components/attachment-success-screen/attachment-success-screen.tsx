import React, { FC, useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { AnimateHeight } from "../animate-height";
import { AttachmentSuccess, AttachmentSuccessProps } from "../attachment-success";
import { FooterProps } from "../footer";
import { HeaderProps } from "../header";
import { MainProps, Main } from "../main";
import { LayoutWithoutSidebar } from "../layout-without-sidebar";
import { fakeAwait } from "../../utils";

export interface AttachmentSuccessScreenProps {
  header: HeaderProps;
  main: MainProps;
  footer: FooterProps;
  success: AttachmentSuccessProps;
}

export const AttachmentSuccessScreen: FC<AttachmentSuccessScreenProps> = ({ header, main, footer, success }) => {
  const { value, setFalse } = useBoolean(true);

  useEffect(() => {
    (async () => {
      await fakeAwait(200);
      setFalse();
    })();
  }, []);

  return (
    <LayoutWithoutSidebar header={header} footer={footer}>
      <Main {...main}>
        <AnimateHeight delay={200} closed={value}>
          <AttachmentSuccess {...success} />
        </AnimateHeight>
      </Main>
    </LayoutWithoutSidebar>
  );
};
