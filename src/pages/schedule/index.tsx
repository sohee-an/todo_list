import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import SlideModal from '../../components/share/SideModal';
import ScheduleForm from '../../components/schedule/ScheduleForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchAssignment,
  fetchDetailAssignment,
  fetchPostAssignment,
  fetchPutAssignment,
} from '../../api/schedule/schedule';
import { fetchDownloadFile } from '../../api/image/image';
import { FaDownload } from 'react-icons/fa6';

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
  const [isEdit, setIsEdit] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['myData'],
    queryFn: fetchAssignment,
  });

  const { data: assignmentDetail, isSuccess } = useQuery({
    queryKey: ['assignmentDetail', selectedAssignmentId],
    queryFn: () => fetchDetailAssignment(selectedAssignmentId!),

    enabled: !!selectedAssignmentId,
  });

  const postAssignment = useMutation({
    mutationFn: fetchPostAssignment,
    onSuccess: (data) => {
      refetch();
    },
    onError: (error: any) => {
      console.error('Error uploading file:', error.message);
    },
  });

  const putAssignment = useMutation({
    mutationFn: ({ assgnmentId, item }: { assgnmentId: string; item: any }) =>
      fetchPutAssignment(assgnmentId, item),
    onSuccess: (data) => {
      console.log('put', data);
      refetch();
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

  const handleFileChange = (files: TUploadedFile) => {
    setFiles((pre) => [...pre, files]);
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
    const item = {
      description: desc,
      images: filesId,
    };
    console.log('item', item);
    if (isEdit && selectedAssignmentId) {
      putAssignment.mutate({ assgnmentId: selectedAssignmentId, item });
    } else {
      postAssignment.mutate(item);
    }

    setProject(initValue);
    setFiles([]);

    setIsModalOpen(false);
  };

  const handleEditFiles = (deleteId: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.fileName !== deleteId)
    );
  };

  const toggleModal = () => {
    setIsEdit(false);
    setFiles([]);
    setIsModalOpen(!isModalOpen);
    setProject(initValue);
  };

  const handleEditClick = (id: string) => {
    if (selectedAssignmentId === id) {
      setSelectedAssignmentId(null);

      setIsModalOpen(false);
      setSelectedAssignmentId(id);
      setIsModalOpen(true);
    } else {
      setSelectedAssignmentId(id);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (isSuccess && assignmentDetail) {
      setProject({
        // dayNumber: assignmentDetail.dayNumber,
        desc: assignmentDetail.description,
      });

      setFiles(
        assignmentDetail.images.length === 0
          ? []
          : assignmentDetail.images.map((image: any) => ({
              ...image, // 다른 키들은 그대로 유지
              fileName: image.path, // path를 fileName으로 변경
            }))
      );

      setIsEdit(true);
      setIsModalOpen(true);
    }
  }, [
    isSuccess,
    assignmentDetail,
    selectedAssignmentId,
    setSelectedAssignmentId,
  ]);

  return (
    <div className="flex min-h-[100%] gap-2">
      <div className="w-full bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">숙제 리스트</h2>

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
              <ul>
                {data &&
                  data.map((item, index) => (
                    <div key={item.id}>
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
                        <div className="mb-4 font-bold">
                          설명 : {item.description}
                        </div>
                        <div className="mb-4 font-bold">자료</div>
                        {item.images.length > 0 &&
                          item.images.map((img) => {
                            const isImage = /\.(jpg|jpeg|png|gif)$/i.test(
                              img.originName
                            );
                            const isPdf = /\.pdf$/i.test(img.originName);

                            return (
                              <div className="flex gap-6 mb-4" key={img.path}>
                                {isImage && (
                                  <div className="flex flex-col gap-2">
                                    <a
                                      href={`http://localhost:8080/public/images/${img.path}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {img.originName}
                                    </a>
                                    <img
                                      src={`http://localhost:8080/public/images/${img.path}`}
                                      alt={img.originName}
                                      className="w-20 h-20 object-cover"
                                    />
                                  </div>
                                )}

                                {isPdf && (
                                  <a
                                    href={`http://localhost:8080/public/images/${img.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {img.originName}
                                  </a>
                                )}

                                <FaDownload
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDownload(img.path, img.originName)
                                  }
                                />
                              </div>
                            );
                          })}
                      </p>
                      <div className="w-full h-1 bg-gray-200 mb-4"></div>
                    </div>
                  ))}
              </ul>
              <button
                className="bg-blue-200 p-2 rounded-lg  text-blue-600"
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
          onEditeFiles={handleEditFiles}
          files={files}
          value={project}
          isEdit={isEdit}
        />
      </SlideModal>
    </div>
  );
};

export default Schedule;
