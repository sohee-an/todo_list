import { useState, ChangeEvent, FormEvent } from 'react';
import SlideModal from '../../components/share/SideModal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import { useMutation } from '@tanstack/react-query';
import { fetchPostAssignment } from '../../api/schedule/schedule';

type TUploadedFile = {
  fileName: string;
  originalName: string;
  fileSize: number;
};

const initValue = {
  dayNumber: 1,
  title: '',
  desc: '',
};
const Schedule = () => {
  const [project, setProject] = useState(initValue);
  const [files, setFiles] = useState<TUploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postAssignment = useMutation({
    mutationFn: fetchPostAssignment,
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const handleFileChange = (files: TUploadedFile[]) => {
    setFiles(files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProject((pre) => ({ ...pre, title: e.target.value }));
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProject((pre) => ({ ...pre, desc: e.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (project.title.trim() === '' || project.desc.trim() === '') {
      alert('제목과 설명을 입력해주세요.');
      return;
    }
    const filesId = files.map((file) => file.fileName);
    const { title, desc } = project;
    const newItem = {
      dayNumber: 1,
      title,
      description: desc,
      images: filesId,
    };

    postAssignment.mutate(newItem);

    setProject(initValue);
    setFiles([]);

    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex min-h-[100%] gap-2">
      <div className="w-1/2 bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">1일차</h2>
        <button
          className=" bg-blue-200 p-2 rounded-lg text-white"
          onClick={toggleModal}
        >
          시작하기
        </button>
      </div>

      <SlideModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title={project.dayNumber}
      >
        <ScheduleForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          onDesChange={handleDescChange}
          onFileUpLoad={handleFileChange}
          files={files}
          value={project}
        />
      </SlideModal>
    </div>
  );
};

export default Schedule;
