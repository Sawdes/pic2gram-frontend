"use server";
import fs from "fs";

import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import sharp from "sharp";

export async function convert(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const saveName = `${randomUUID()}-${Date.now().toString()}.webp`;
  const savePath = path.join(
    process.cwd(),
    "/.next/server/public/images/",
    saveName
  );
  const outBuffer = await sharp(buffer).resize(100, 100).webp().toBuffer();
  fs.writeFileSync(savePath, outBuffer);
  revalidatePath("/");
  return saveName;
}
