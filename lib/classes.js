import fs from "fs";
import path from "path";

const classDirectory = path.join(process.cwd(), "classes");
export function getAllClassIds() {
  const fileNames = fs.readdirSync(classDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ""),
      },
    };
  });
}

export function getClassData(id) {
  const fullPath = path.join(classDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  let data = JSON.parse(fileContents);

  return {
    data,
  };
}
