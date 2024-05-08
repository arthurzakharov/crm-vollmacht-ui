import { FC, PropsWithChildren } from "react";
import { Header, Footer } from "crm-vollmacht-ui";
import Sidebar from "@/components/sidebar";
import logoSrc from "@/assets/logo.svg";
import useFooterLinks from "@/hooks/useFooterLinks";
import "./layout-with-sidebar.css";

const LayoutWithSidebar: FC<PropsWithChildren> = (props) => {
  const links = useFooterLinks();

  return (
    <div className="layout-with-sidebar">
      <div className="layout-with-sidebar__header">
        <Header
          logo={logoSrc}
          tel="030 / 22 066 23 88"
          descriptions={[{ size: "m", value: "Mo-Fr von 8:00 - 20:00" }]}
        />
      </div>
      <div className="layout-with-sidebar__content">
        <div className="layout-with-sidebar__main">{props.children}</div>
        <div className="layout-with-sidebar__sidebar">
          <Sidebar />
        </div>
      </div>
      <div className="layout-with-sidebar__footer">
        <Footer name="www.schuldenanalyse-kostenlos.de" links={links} />
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
