interface Props {
  title: string;
  content: string;
}

const PlaceDescriptionDiv = ({ title, content }: Props) => {
  return (
    <div className="w-full h-fit min-h-[32px] flex gap-[16px]">
      <p className="min-w-[110px] h-[32px] font-semibold text-[20px]">
        {title}
      </p>
      <p className="w-fit min-h-[32px] text-[16px] flex items-center">
        {content}
      </p>
    </div>
  );
};

export default PlaceDescriptionDiv;
