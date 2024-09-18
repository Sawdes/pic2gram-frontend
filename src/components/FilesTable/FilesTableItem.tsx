import React, { useEffect } from "react";
import Spinner from "../ui/Spinner";
import { CustomButton } from "../ui/CustomButton";
import { TfiDownload } from "react-icons/tfi";

interface FilesTableItemsProps {
  id: number;
  name: string;
  path: string | null;
  isReady: boolean;
}
export default function FilesTableItems(props: FilesTableItemsProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = props.path!;
    link.download = props.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-between border-2 my-4 p-2 rounded-xl">
      <div className="font-semibold">{props.id}</div>
      <div className="flex items-center justify-around">
        <p
          className={`text-ellipsis text-nowrap w-[36vw] max-w-max inline-block overflow-hidden${
            props.name === "error" ? "text-red-600" : ""
          }`}
        >
          {props.name}
        </p>
      </div>
      {props.isReady ? (
        props.path ? (
          <CustomButton className="px-2" onClick={handleDownload}>
            <div className="hidden md:block">Donwload</div>
            <div className="md:hidden">
              <TfiDownload size={24} />
            </div>
          </CustomButton>
        ) : (
          <></>
        )
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}
