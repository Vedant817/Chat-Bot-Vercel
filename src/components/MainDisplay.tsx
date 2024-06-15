"use client"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import MainPageData from '@/MainPageData.json'

const MainDisplay = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000 })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs m-2"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: "start",
                loop: true,
            }}
        >
            <CarouselContent>
                {MainPageData.map((data, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <CardContent className="flex aspect-square items-center justify-center p-6 flex-col bg-gray-700 w-full rounded-lg m-auto">
                                <p className="text-3xl font-bold mb-1">{data.name}</p>
                                <p className="text-2xl font-medium text-slate-300 mb-3 text-center">{data.title}</p>
                                <p className="text-lg font-normal text-white text-center">{data.quote}</p>
                            </CardContent>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default MainDisplay