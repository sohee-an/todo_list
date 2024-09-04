import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import SlideModal from '../../components/share/SideModal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchAssignment,
  fetchDetailAssignment,
  fetchPostAssignment,
} from '../../api/schedule/schedule';
import { fetchDownloadFile } from '../../api/image/image';

type TUploadedFile = {
  fileName: string;
  originName: string;
  fileSize: number;
};

const initValue = {
  // dayNumber: 1,
  // title: '',
  desc: '',
};

const Schedule = () => {
  const [project, setProject] = useState(initValue);
  const [files, setFiles] = useState<TUploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['myData'],
    queryFn: fetchAssignment,
  });

  const {
    data: assignmentDetail,
    isLoading: isDetailLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['assignmentDetail', selectedAssignmentId],
    queryFn: () => fetchDetailAssignment(selectedAssignmentId!),

    enabled: !!selectedAssignmentId,
  });

  const postAssignment = useMutation({
    mutationFn: fetchPostAssignment,
    onSuccess: (data) => {
      console.log('data', data);
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const downloadMutation = useMutation({
    mutationFn: fetchDownloadFile,
    onSuccess: (data, variables) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', variables.originName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (error) => {
      console.error('Error downloading file:', error);
    },
  });

  const handleDownload = (fileName: string, originName: string) => {
    downloadMutation.mutate({ fileName, originName });
  };

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
    if (project.desc.trim() === '') {
      alert('제목과 설명을 입력해주세요.');
      return;
    }
    const filesId = files.map((file) => ({
      fileName: file.fileName,
      fileOriginName: file.originName,
    }));

    const { desc } = project;
    const newItem = {
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

  const handleEditClick = (id: string) => {
    setSelectedAssignmentId(id);
  };

  useEffect(() => {
    if (isSuccess && assignmentDetail) {
      // 서버에서 받아온 데이터를 폼에 채움
      setProject({
        // dayNumber: assignmentDetail.dayNumber,
        desc: assignmentDetail.description,
      });

      setFiles(
        assignmentDetail.images.length === 0 ? [] : assignmentDetail.images
      ); // 이미지 데이터 설정
      setIsModalOpen(true); // 수정 모달 열기
    }
  }, [isSuccess, assignmentDetail]);

  return (
    <div className="flex min-h-[100%] gap-2">
      <div className="w-full bg-white rounded-lg p-8 shadow-lg">
        {isLoading ? (
          <div>로딩중</div>
        ) : data && data.length === 0 ? (
          <>
            <h2 className="text-xl font-bold mb-4">1일차</h2>
            <button
              className="bg-blue-200 p-2 rounded-lg text-white"
              onClick={toggleModal}
            >
              시작하기
            </button>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-bold mb-4">숙제 리스트</h2>
              <ul>
                {data &&
                  data.map((item, index) => (
                    <>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold mb-4">
                          {index + 1}일차
                        </h2>
                        <button
                          onClick={() => handleEditClick(item.id)}
                          className="bg-blue-200 p-2 rounded-lg "
                        >
                          수정
                        </button>
                      </div>

                      <p className="mb-6">
                        <div className="mb-4">설명 : {item.description}</div>
                        <div className="mb-2">자료</div>
                        {item.images.length > 0 &&
                          item.images.map((img) => (
                            <>
                              <div
                                onClick={() =>
                                  handleDownload(img.path, img.originName)
                                }
                              >
                                {img.originName}
                              </div>
                            </>
                          ))}
                      </p>
                      <div className="w-full h-1 bg-gray-200 mb-4"></div>
                    </>
                  ))}
              </ul>
              <button
                className="bg-blue-200 p-2 rounded-lg text-white"
                onClick={toggleModal}
              >
                추가하기
              </button>
            </div>
          </>
        )}
      </div>
      <SlideModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        // title={project.dayNumber}
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
