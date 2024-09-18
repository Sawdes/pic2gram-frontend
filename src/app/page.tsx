"use client";

import FilesTable from "@/components/FilesTable/FilesTable";
import MainDropzone from "@/components/MainDropzone/MainDropzone";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-52">
      <div className="text-5xl py-6 text-center font-bold">
        Hello! Create your emoji.
      </div>
      <MainDropzone></MainDropzone>
      <FilesTable></FilesTable>
    </div>
  );
}
