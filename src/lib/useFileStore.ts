import { create } from "zustand";
import { convert } from "./convert";

// Определяем тип для файла
interface File {
  id: number;
  name: string;
  path: null | string;
  isReady: boolean;
  formData: FormData;
}

// Тип для состояния хранилища
interface FileStore {
  files: File[];
  nextId: number;
  addFile: (formData: FormData) => void;
  removeFile: (id: number) => void;
  convertFile: any;
  clearFiles: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  nextId: 1,

  incNextId: () => set((state) => ({ nextId: state.nextId + 1 })),
  addFile: (formData) => {
    set((state) => {
      const newFile = {
        id: state.nextId,
        path: null,
        isReady: false,
        name: (formData.get("file") as unknown as File).name,
        formData: formData,
      };
      return {
        files: [...state.files, newFile],
        nextId: state.nextId + 1,
      };
    });
  },

  convertFile: async (fileId: number) => {
    try {
      const { files } = get();
      const file = files[fileId - 1];
      const path = `api/images/${await convert(file.formData)}`;
      set((state) => {
        const newFiles = state.files.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              path,
              isReady: true,
            };
          }
          return file;
        });
        return {
          files: newFiles,
        };
      });
    } catch (error) {
      set((state) => {
        const newFiles = state.files.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              name: "error",
              path: null,
              isReady: true,
            };
          }
          return file;
        });
        return {
          files: newFiles,
        };
      });
    }
  },

  removeFile: (id) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    })),

  clearFiles: () => set({ files: [], nextId: 1 }),
}));
