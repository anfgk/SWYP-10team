import { Toaster } from "sonner";

const CustomToast = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "!w-[200px] flex justify-center items-center",
      }}
    />
  );
};

export default CustomToast;
