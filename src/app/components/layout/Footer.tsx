import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black px-6 py-12 text-white shadow-[0_-24px_60px_rgba(0,0,0,0.28)]">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.18fr] md:items-start">
                <div className="pt-1 text-sm leading-relaxed">
                    <p className="text-[1.1rem] font-semibold leading-none">About us</p>
                    <p className="mt-3">
                        <span className="font-semibold">Email:</span>{" "}
                        info@forgottenscientists.com
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Phone number:</span> +380 67 422 20 99
                    </p>
                    <p className="mt-5 text-xs text-gray-400">
                        ©Forgotten scientists
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end md:text-right">
                    <div className="w-full md:w-[34rem]">
                    <p className="text-base font-semibold leading-8 text-gray-200">
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
