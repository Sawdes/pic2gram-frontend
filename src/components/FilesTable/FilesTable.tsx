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
                Кароче, здесь на русском. Заходишь в телеграм, там есть бот
                <Link
                  className="text-blue-500 font-medium"
                  href="https://t.me/Stickers"
                >
                  {" https://t.me/Stickers "}
                </Link>
                Нажимаешь меню, далее /newemojipack, Статичные эмодзи и даешь
                название для пака. После уже качаешь картинку отсюда и кидаешь
                боту(обязательно без сжатия!!!). Потом надо дать соответствующий
                эмодзи, например {"😁"} дальше /publish и /skip<br></br>
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
