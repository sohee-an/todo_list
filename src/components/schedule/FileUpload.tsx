import { ChangeEvent, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { fetchPostImage } from '../../api/schedule/schedule';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onFileUpLoad: (filesId: string) => void;
};

type UploadedFile = {
  id: string;
  file: File;
};

function FileUpload({ onFileUpLoad }: Props) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const { mutate } = useMutation({
    mutationFn: fetchPostImage,
    onSuccess: ({ fileName }) => {
      // console.log('File uploaded successfully:', fileName);
      onFileUpLoad(fileName);
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: uuidv4(),
        file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);

      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('image', file);
      });

      mutate(formData);
    },
    [mutate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter(({ file }) => file.name !== fileName)
    );
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 p-6 text-center h-40 flex justify-center items-center  ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>여기에 파일을 놓아주세요...</p>
        ) : (
          <p className="text-gray-400">
            파일을 드래그 앤 드롭하거나 클릭해서 업로드하세요. <br />
            (PDF 또는 이미지만 가능)
          </p>
        )}
      </div>
      <ul className="mt-4">
        {files.map(({ file }) => (
          <li
            key={file.name}
            className="text-gray-600 flex justify-between items-center mb-2"
          >
            <span>
              {file.name} ({file.size} bytes)
            </span>
            <button
              onClick={() => removeFile(file.name)}
              className="ml-4 text-white bg-red-400 py-1 px-2 rounded-lg"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileUpload;
