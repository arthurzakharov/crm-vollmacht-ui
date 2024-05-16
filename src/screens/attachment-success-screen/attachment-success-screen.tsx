import React, { FC, useEffect } from "react";
import { useBoolean } from "usehooks-ts";
import { AnimateHeight } from "../../components/animate-height";
import { AttachmentSuccess, AttachmentSuccessProps } from "../../components/attachment-success";
import { FooterProps } from "../../components/footer";
import { HeaderProps } from "../../components/header";
import { MainProps, Main } from "../../components/main";
import { LayoutWithoutSidebar } from "../../components/layout-without-sidebar";
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
