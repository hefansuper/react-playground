/*
 * @Author: stephenHe
 * @Date: 2025-04-02 10:51:49
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-07 17:08:09
 * @Description: 工具文件
 * @FilePath: /react playground/src/ReactPlayground/utils.ts
 */

import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate";
import saveAs from "file-saver";
import JSZip from "jszip";

export const fileName2Language = (name: string) => {
  const suffix = name.split(".").pop() || "";
  if (["js", "jsx"].includes(suffix)) return "javascript";
  if (["ts", "tsx"].includes(suffix)) return "typescript";
  if (["json"].includes(suffix)) return "json";
  if (["css"].includes(suffix)) return "css";
  return "javascript";
};

// 压缩
// binary生成asc码
export function compress(data: string): string {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const str = strFromU8(zipped, true);
  return btoa(str);
}


// 解压缩
// 将asc码转换为binary
export function uncompress(base64: string): string {
  const binary = atob(base64);

  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return strFromU8(unzipped);
}


// 将代码生成zip文件并下载。
// JSZip生成zip文件，file-saver下载zip文件
export async function downloadFiles(files: Files) {
  const zip = new JSZip();

  Object.keys(files).forEach((name) => {
    zip.file(name, files[name].value);
  });

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`);
}

