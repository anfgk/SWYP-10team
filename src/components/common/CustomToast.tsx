import { Toaster } from "sonner";

const CustomToast = () => {
  return (
    <Toaster
      // position="bottom-center"
      toastOptions={{
        className:
          "!fixed !bottom-[20px] !left-1/2 -translate-x-1/2 !w-[200px] flex justify-center items-center !rounded-[16px]",
      }}
    />
  );
};

export default CustomToast;
