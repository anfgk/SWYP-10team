import { Link } from "react-router-dom";
import PopularCard from "./PopularCard";

export default function PopularList() {
    const testPopular = [1, 2, 3, 4];

    return (
        <section className="flex justify-center items-center w-full h-[632px]">
            <div className="flex flex-col justify-between w-[1536px] h-[528px]">
                <div className="flex justify-between">
                    <p className="text-[48.88px] text-[var(--text-color)]">인기</p>
                    <Link to={'/'} className="text-[25.4px]">더보기</Link>
                </div>
                <div className="flex gap-[32px]">
                    {testPopular.map((popular) => (
                        <PopularCard key={popular} value={popular} />
                    ))}
                </div>
            </div>

        </section>
    )
}