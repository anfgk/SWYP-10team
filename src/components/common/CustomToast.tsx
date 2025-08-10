import { Toaster } from "sonner";

const CustomToast = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "flex justify-center items-center !rounded-[16px]",
      }}
    />
  );
};

export default CustomToast;
