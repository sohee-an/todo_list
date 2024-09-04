import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import { fetchDeleteImage, fetchPostImage } from '../../api/image/image';

type Props = {
  onFileUpLoad: (files: any[]) => void;
  files: any[];
};

function FileUpload({ onFileUpLoad, files }: Props) {
  const { mutate } = useMutation({
    mutationFn: fetchPostImage,
    onSuccess: (data) => {
      const newFiles = [...files, data];
      onFileUpLoad(newFiles);
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: fetchDeleteImage,
    onSuccess: ({ imageId }) => {
      const filterFiles = files.filter((file) => file.fileName !== imageId);
      onFileUpLoad(filterFiles);
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const formData = new FormData();
        formData.append('image', file);

        mutate(formData);
      });
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
    deleteMutation.mutate(fileName);
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
        {files.length !== 0 &&
          files.map((file) => (
            <li
              key={file.fileName}
              className="text-gray-600 flex justify-between items-center mb-2"
            >
              <span>
                {file.originName} {file.fileSize && `(${file.fileSize} bytes)`}
              </span>
              <button
                type="button"
                onClick={() => removeFile(file.fileName)}
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
