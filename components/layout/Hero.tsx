import Image from "next/image"
import { Button } from "../ui/button"

const Hero = () => {
    return (
        <div className="flex border max-w-7xl mx-auto mt-8 bg-mycolor1/80 rounded-4xl text-mycolor2 py-16">
            <div className="mx-auto px-10 py-4 flex flex-col lg:flex-row gap-10">
                <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden bg-mycolor2/10 border border-mycolor2/10">
                        <Image
                            src="/bg1.jpg"
                            alt="Workspace"
                            width={900}
                            height={900}
                            className="w-full h-[580px] object-cover"
                        />
                        <p className="text-center px-4 py-3 text-xs text-mycolor2/60 border-t border-mycolor2/10">
                            Lorem ipsum dolor sit amet.
                        </p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center space-y-6">
                    <Image
                        src="/bg1.jpg"
                        alt="Workspace"
                        width={80}
                        height={80}
                        className="rounded-full border border-mycolor2/10"
                    />
                    <h1 className="text-5xl font-semibold">Hi! I'm Kevser</h1>
                    <h2 className="text-xl font-medium text-mycolor2/80">Frontend Developer</h2>
                    <div className="space-y-4 text-lg text-mycolor2/30 leading-relaxed">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius rem magnam quo possimus vitae. Dolores illo, architecto assumenda laboriosam praesentium laborum consectetur eveniet fugit!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius rem magnam quo possimus vitae. Dolores illo, architecto assumenda laboriosam praesentium laborum consectetur eveniet fugit!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius rem magnam quo possimus vitae. Dolores illo, architecto assumenda laboriosam praesentium laborum consectetur eveniet fugit!</p>
                    </div>
                    <div>
                        <Button variant={"secondary"} size={"lg"}>
                            Let' work together
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero