import { ChangeEvent, FormEvent } from 'react';
import FileUpload from './FileUpload';

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDesChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFileUpLoad: (files: any[]) => void;
  files: any[];
  value: { desc: string };
};

function ScheduleForm({
  onSubmit,
  onDesChange,
  value,
  files,
  onFileUpLoad,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2">
          제목
        </label> */}
        {/* <input
          type="text"
          value={value.title}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="제목을 입력하세요"
        /> */}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          파일 업로드
        </label>
        <FileUpload files={files} onFileUpLoad={onFileUpLoad} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          설명
        </label>
        <textarea
          cols={50}
          rows={3}
          value={value.desc}
          onChange={onDesChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="설명을 입력하세요"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          생성
        </button>
      </div>
    </form>
  );
}

export default ScheduleForm;
