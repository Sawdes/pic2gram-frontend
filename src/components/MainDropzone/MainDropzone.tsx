import { convert } from "@/lib/convert";
import { useFileStore } from "@/lib/useFileStore";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { IoLogoDropbox } from "react-icons/io";
import { CustomButton } from "../ui/CustomButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface MainDropzoneProps {}

export default function MainDropzone(props: MainDropzoneProps) {
  const { addFile, convertFile, nextId, files } = useFileStore();
  // const onDrop = (acceptedFiles: File[]) => {
  //   acceptedFiles.map((file) => {
  //     add(file);
  //   });
  // };
  // const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
  //   useDropzone({
  //     onDrop: onDrop,
  //     accept: {
  //       "image/jpeg": [],
  //       "image/png": [],
  //     },
  //   });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    addFile(formData);
    await convertFile(nextId);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="mx-auto">
          <input className="mx-auto" type="file" name="file" />
        </label>
        <CustomButton className="w-2/6 mx-auto" type="submit">
          Submit
        </CustomButton>
      </form>
    </>
    // <section className="">
    //   <div className="">
    //     <div
    //       {...getRootProps({
    //         className:
    //           "dropzone border-black border-2 p-2 rounded-xl cursor-pointer flex items-center justify-center gap-6",
    //       })}
    //     >
    //       <input {...getInputProps()} />
    //       <p>Select or Drag 'n' drop file</p>
    //       <IoLogoDropbox size={64}></IoLogoDropbox>
    //     </div>
    //   </div>
    // </section>
  );
}
