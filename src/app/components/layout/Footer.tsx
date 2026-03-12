export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="text-sm leading-relaxed">
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

                <div className="flex flex-col items-start md:items-end text-right md:text-left">
                    <p className="text-sm md:text-base max-w-md">
                        Discover the hidden heroes of science from around the world
                    </p>
                </div>
            </div>
        </footer>
    )
}