export default function MapForgottenScientist() {
    return (
        <section className="pt-20 pb-40">
            <h2 className="text-5xl font-bold mb-2">Map of Forgotten Scientists</h2>
            <p className="text-gray-600 mb-12">
                Discover where science was born
            </p>
            <div className="relative w-full">
                <img className="w-full" src="/WorldMap.png" alt="" />
                <div className="absolute bottom-0 flex flex-col flex-wrap gap-4 mb-6 text-sm">
                    <button className="flex items-center gap-2 px-4 py-2 border-b">
                        <img
                            src="/icons/Atom_light.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Field
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 border-b">
                        <img
                            src="/icons/Map.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Country
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2">
                        <img
                            src="/icons/Watch.png"
                            alt=""
                            className="w-8 h-8 object-contain"
                        />
                        By Century
                    </button>
                </div>
            </div>
        </section>
    )
}