import { useCallback, useContext, useEffect, useState } from "react";

import { PlaygroundContext } from "../../PlaygroundContext";
import { compile } from "./compiler";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../../files";

export default function Preview() {
  const { files } = useContext(PlaygroundContext);
  const [compiledCode, setCompiledCode] = useState("");

  const getIframeUrl = useCallback(() => {
    // 将编译后的代码和 importmap 插入到 iframe 中
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );

    // 给到iframe的时候也是生成的html的blob url
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  }, [compiledCode, files]);

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  useEffect(() => {
    // 每次左边编辑器内容变化时，重新生成iframe的url
    setIframeUrl(getIframeUrl());
  }, [compiledCode, getIframeUrl]);

  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
    </div>
  );
}
