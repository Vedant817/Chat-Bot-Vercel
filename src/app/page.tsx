import Image from "next/image";
import NavBar from "@/compoments/NavBar";
import Footer from "@/compoments/Footer";
import Typewriter from "@/compoments/Typewriter";
import MainDisplay from "@/compoments/MainDisplay";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <Typewriter text='Transforming Conversations, Empowering Connections.' speed={200} pauseDuration={1000} className={"text-4xl font-semibold"} />
        <MainDisplay />
      </main>
      <Footer />
    </>
  );
}
