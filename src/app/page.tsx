"use client"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Typewriter from "@/components/Typewriter";
import MainDisplay from "@/components/MainDisplay";
import { account } from "@/lib/appwrite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    const checkSession = async () => {
      const session = await account.get();
      if(session){
        router.push('/chat')
      }
    }
    checkSession()
  }, [])
  return (
    <>
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-black text-white">
        <Typewriter text='Transforming Conversations, Empowering Connections.' speed={200} pauseDuration={1000} className={"text-4xl font-semibold mb-3"} />
        <MainDisplay />
        <div className="w-fit p-6 text-justify">
          <p className="text-2xl font-semibold font-mono text-blue-500">A basic chatbot built using Vercel AI SDK leverages powerful AI capabilities to understand user input and generate appropriate responses in real-time. It utilizes Vercel’s advanced natural language processing (NLP) models to interpret user queries and provide intelligent answers, enhancing user interaction and engagement.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
