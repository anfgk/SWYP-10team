interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmText?: string;
  cancelText?: string;
  height?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "예",
  cancelText = "아니오",
  height = "h-[237px]",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const getHeightValue = (heightClass: string) => {
    const match = heightClass.match(/h-\[(\d+)px\]/);
    return match ? `${match[1]}px` : "237px";
  };

  return (
    <div className="fixed inset-0 bg-[#00000080] bg-opacity-20 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-[24px] py-[32px] px-[24px] w-[562px]"
        style={{ height: getHeightValue(height) }}
      >
        <div className="flex justify-between items-center mb-[24px]">
          <h3
            className="w-[100%] flex justify-center text-[18px] font-[600] font-semibold text-center"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-[514px] h-[56px] py-[16px] px-[168px] text-lg bg-[var(--main-color)] text-white rounded-[12px] hover:bg-[var(--main-color)] transition-colors"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="w-[514px] h-[56px] py-[16px] px-[168px] text-lg font-semibold bg-[var(--button-bg)]/16 text-gray-800 rounded-[12px] hoverbg-[var(--button-bg)]/16 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
