type Props = {
    value: number;
}

export default function AiRecCard({value}: Props) {
    return (
        <div className="bg-[var(--card-bg)] h-[577px]">
            <p className="pl-240 pt-50 text-5xl">{value}</p>
        </div>
    )
}