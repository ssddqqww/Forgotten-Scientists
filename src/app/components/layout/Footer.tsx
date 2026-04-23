export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-6">
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 md:items-center">
                <div className="text-sm leading-relaxed">
                    <p className="font-semibold">About us</p>
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        info@forgottenscientists.com
                    </p>
                    <p>
                        <span className="font-semibold">Phone number:</span> +380 67 422 20 99
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        ©Forgotten scientists
                    </p>
                </div>

                <div className="flex flex-col items-start md:items-end md:text-right">
                    <p className="text-sm md:text-base max-w-md font-semibold text-gray-200">
                        Discover the hidden heroes of science from around the world
                    </p>
                    <div className="mt-3 text-left md:text-right">
                        <p className="text-4xl font-serif leading-none text-[#d8c46c]">FORGOTTEN</p>
                        <p className="text-xl font-serif leading-none text-gray-200">SCIENTIST</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
