import React, { useRef } from "react";
import PageButton from "../ui/page-button";

interface ImageUploadSectionProps {
  selectedFiles: File[];
  onFileSelect: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  maxFiles?: number;
}

const ImageUploadSection = ({
  selectedFiles,
  onFileSelect,
  onFileRemove,
  onSave,
  onCancel,
  maxFiles = 3,
}: ImageUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length <= maxFiles) {
        onFileSelect([...selectedFiles, ...newFiles]);
      } else {
        alert(`최대 ${maxFiles}개까지만 첨부 가능합니다.`);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-[24px]">
        <div className="font-medium mr-[50px] text-[20px]">사진첨부</div>
        <PageButton text="사진 첨부하기" onClick={handleUploadClick} />
        <span className="text-gray-600">
          {selectedFiles.length}/{maxFiles}
        </span>
        <div className="flex gap-4 ml-auto">
          <PageButton text="저장하기" variant="default" onClick={onSave} />
          <PageButton text="취소하기" variant="default" onClick={onCancel} />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept="image/*"
        className="hidden"
      />

      {selectedFiles.length > 0 && (
        <div className="flex gap-[16px]">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`첨부파일 ${index + 1}`}
                className="w-[212px] h-[141px] object-cover rounded-lg"
              />
              <button
                onClick={() => onFileRemove(index)}
                className="absolute -top-2 -right-[11px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
