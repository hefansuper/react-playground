import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useContext } from "react";
import { PlaygroundContext } from "../../PlaygroundContext";

import logoSvg from "./icons/icon.svg";
import styles from "./index.module.scss";

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          />
        )}
      </div>
    </div>
  );
}
