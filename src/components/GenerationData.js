import React, { useEffect, useState } from 'react'
import { getNFTMetaById } from '../data'

function GenerationData({ id }) {
    const [meta, setMeta] = useState({})

    const [copy, setCopy] = useState("Click to copy")
    const resetTooltip = () => {
        setTimeout(() => {
            setCopy("Click to copy")
        }, 50)
        document.removeEventListener("mouseout", resetTooltip);
    };
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        setCopy("Copied to clipboard!")
        document.addEventListener("mouseout", resetTooltip);
    }

    useEffect(() => {
        getNFTMetaById(id).then(res => setMeta(res))
    }, [id])

    return (
        <div className="w-full">
            <div className="border-2 border-dashed border-gray-300 bg-gray-200 p-5 rounded-xl">
                <h2 className=" text-2xl text-primary-800 text-center font-bold mb-10">Generation data</h2>
                {
                    <div className="grid grid-cols-6 gap-x-10 gap-y-5 items-center">
                        <p className="font-semibold">Generation Time</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.generationTime)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.generationTime} s
                        </p>
                        <p className="font-semibold">Prompt</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.prompt)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.prompt}
                        </p>
                        <p className="font-semibold">Negative Prompt</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.negative_prompt)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.negative_prompt}
                        </p>
                        <p className="font-semibold">Model</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.model)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.model}
                        </p>
                        <p className="font-semibold">VAE</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.vae)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.vae}
                        </p>
                        <p className="font-semibold">Size</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.W + "x" + meta.meta.H)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.W}x{meta.meta.H}
                        </p>
                        <p className="font-semibold">Revision</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.revision}
                        </p>
                        <p className="font-semibold">Steps</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.steps)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.steps}
                        </p>
                        <p className="font-semibold">CFG scale</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.guidance_scale)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.guidance_scale}
                        </p>
                        <p className="font-semibold">Seed</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.meta.seed)}>
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.seed}
                        </p>
                        <p className="font-semibold">NSFW filter</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.safetychecker}
                        </p>
                        <p className="font-semibold">Attention slicing</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.enable_attention_slicing}
                        </p>
                        <p className="font-semibold">Instant response</p>
                        <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                            <span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                {copy}
                            </span>
                            {meta.meta.instant_response}
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default GenerationData
