"use client";

import React, { useCallback, useEffect, useState } from "react";
import FilesTableItem from "./FilesTableItem";
import { CustomButton } from "../ui/CustomButton";
import { convert } from "@/lib/convert";
import { useFileStore } from "@/lib/useFileStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";

export default function FilesTable() {
  const { files, clearFiles } = useFileStore();
  if (files.length)
    return (
      <>
        <hr className="my-8" />
        <Dialog>
          <DialogTrigger className="w-full text-right underline">
            👉Instruction👈
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="">Instruction manual</DialogTitle>
              <DialogDescription>
                1. Заходишь в телеграм, там есть бот
                <Link
                  className="text-blue-500 font-medium"
                  href="https://t.me/Stickers"
                >
                  {" https://t.me/Stickers "}
                </Link>
                <br></br>
                2. Нажимаешь меню
                <br></br>
                3. Далее /newemojipack
                <br></br>
                4. Статичные эмодзи
                <br></br>
                5. Даешь название для пака
                <br></br>
                6. Качаешь картинку отсюда и кидаешь боту(обязательно без
                сжатия!!!).
                <br></br>
                7. Надо дать соответствующий эмодзи, например {"😁"}
                <br></br>
                8. Дальше /publish и /skip<br></br>
                <br></br>
                <p className="font-bold">ВСЕ ГОТОВО 🥵</p>
                <div className=""></div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="mt-6">
          <div className="flex justify-between items-center p-2 border-2 rounded-lg">
            <div className="">Files:</div>
            <CustomButton onClick={clearFiles}>Clear</CustomButton>
          </div>
          {files.map((file) => (
            <FilesTableItem
              id={file.id}
              name={file.name}
              key={file.id}
              path={file.path}
              isReady={file.isReady}
            ></FilesTableItem>
          ))}
        </div>
      </>
    );
}
