import SVGIcons from "./SVGIcons";

const ScrollToTopButton = () => {
  return (
    <button
      className="fixed bottom-[80px] right-[80px] w-fit h-fit rounded-[75.6px] cursor-pointer z-500"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <SVGIcons name="scrollTop" width={56} height={56} />
    </button>
  );
};

export default ScrollToTopButton;
