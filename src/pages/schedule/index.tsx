import { useState, ChangeEvent, FormEvent } from 'react';
import SlideModal from '../../components/share/SideModal';
import ScheduleForm from '../../components/schedule/ScheduleForm';


const Schedule = () => {
  const [project, setProject] = useState({ title: '', desc: '' });
  const [file, setFile] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (filesId: string) => {
    setFile((pre) => ({ ...pre, filesId }));
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
    console.log('project', project);
    // 폼 제출 로직
    setIsModalOpen(false); // 폼 제출 후 모달 닫기
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

      <SlideModal isOpen={isModalOpen} onClose={toggleModal} title="1일차">
        <ScheduleForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          onDesChange={handleDescChange}
          onFileUpLoad={handleFileChange}
          value={project}
        />
      </SlideModal>
    </div>
  );
};

export default Schedule;
