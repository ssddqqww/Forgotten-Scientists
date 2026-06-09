import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#070b14] px-5 py-12 text-white sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.18fr] md:items-start">
                <div className="pt-1 text-sm leading-relaxed">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Forgotten Scientists</p>
                    <p className="mt-3 max-w-sm text-xl font-semibold leading-8">Science history is bigger than the names we already know.</p>
                    <p className="mt-3">
                        <span className="font-semibold">Email:</span>{" "}
                        info@forgottenscientists.com
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Phone number:</span> +380 67 422 20 99
                    </p>
                    <p className="mt-6 text-xs text-gray-500">
                        © Forgotten Scientists
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end md:text-right">
                    <div className="w-full md:w-[34rem]">
                    <p className="text-sm font-semibold leading-7 text-gray-300 sm:text-base sm:leading-8">
                        Discover the hidden heroes of science from around the world
                    </p>
                    <Image
                        src="/footer-logo.png"
                        alt="Forgotten Scientist"
                        width={940}
                        height={265}
                        className="mt-4 ml-auto h-auto w-full max-w-[350px] md:max-w-[380px] md:translate-x-5"
                    />
                    </div>
                </div>
            </div>
        </footer>
    )
}
