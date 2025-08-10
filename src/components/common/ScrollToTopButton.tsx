import SVGIcons from "./SVGIcons";

const ScrollToTopButton = () => {
  return (
    <button
      className="
  fixed bottom-20 
  right-[max(16px,calc((100vw-1200px)/2))]
  rounded-[75.6px] z-[500] cursor-pointer transition hover:brightness-90
"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <SVGIcons name="scrollTop" width={56} height={56} />
    </button>
  );
};

export default ScrollToTopButton;
