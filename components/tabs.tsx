interface TabsProps {
    tabs: Array<string>
    selected: string
    onSelect: (tab: string) => void
}

export default function Tabs({ tabs, selected, onSelect }: TabsProps) {
    return (
        <div className="flex">
            {tabs.map((tab) => (
                <div
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className={`px-4 py-2 cursor-pointer rounded-t-lg font-semibold text-sm ${tab === selected
                        ? "bg-[#A31621] text-white border-[#a51c30]"
                        : "bg-white border-1 text-[#808080]"
                        }`}
                >
                    {tab}
                </div>
            ))}
        </div>
    )
}