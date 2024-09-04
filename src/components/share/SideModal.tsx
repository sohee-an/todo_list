import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // title: number;
}

function SlideModal({ isOpen, onClose, children }: ModalProps) {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`h-full w-1/2 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={handleBackgroundClick}
      >
        <div className="p-4 flex justify-between items-center border-b">
          {/* <h2 className="text-xl font-bold">{title}</h2> */}
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            닫기
          </button>
        </div>
        <section className="p-4">{children}</section>
      </div>
    </div>
  );
}

export default SlideModal;
