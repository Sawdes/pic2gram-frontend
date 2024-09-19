import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;

  // Определяем путь к изображению
  const imagePath = path.join(process.cwd(), "public", "images", filename);

  // Проверяем, существует ли файл
  if (!fs.existsSync(imagePath)) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }

  // Читаем файл и возвращаем его как ответ
  const imageBuffer = fs.readFileSync(imagePath);

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": getContentType(filename), // Функция для определения типа контента
    },
  });
}

function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream"; // Системный тип
  }
}
