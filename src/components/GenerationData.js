import { useEffect, useState } from 'react'
import { _getNFTMeta } from '../data'

function GenerationData({ id, setMetaPopup }) {
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
        _getNFTMeta(id).then(res => setMeta(res.meta))
    }, [id])

    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4 h-[54rem]">
                <div className="rounded-xl bg-white shadow-xl w-full px-16 py-5 h-3/4">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4 mb-10">Generation Data</h3>
                    <div className="container mx-auto">
                        {
                            Object.keys(meta).length !== 0 &&
                            <div className="grid grid-cols-6 gap-x-10 gap-y-5 items-center overflow-y-scroll max-h-[26rem]">
                                <p className="font-semibold">Prompt</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.prompt)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.prompt}
                                </p>
                                <p className="font-semibold">Negative Prompt</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.negative_prompt)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.negative_prompt}
                                </p>
                                <p className="font-semibold">Model</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.model)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.model}
                                </p>
                                <p className="font-semibold">VAE</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.vae)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.vae}
                                </p>
                                <p className="font-semibold">Size</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.W + "x" + meta.H)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.W}x{meta.H}
                                </p>
                                <p className="font-semibold">Revision</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.revision}
                                </p>
                                <p className="font-semibold">Steps</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.steps)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.steps}
                                </p>
                                <p className="font-semibold">CFG scale</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.guidance_scale)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.guidance_scale}
                                </p>
                                <p className="font-semibold">Seed</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(meta.seed)}>
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.seed}
                                </p>
                                <p className="font-semibold">NSFW filter</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.safety_checker}
                                </p>
                                <p className="font-semibold">Attention slicing</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.enable_attention_slicing}
                                </p>
                                <p className="font-semibold">Instant response</p>
                                <p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
                                    <span className="pointer-events-none absolute right-4 bottom-2 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
                                        {copy}
                                    </span>
                                    {meta.instant_response}
                                </p>
                            </div>
                        }
                    </div>
                    <div className="py-10 space-y-2 text-gray-600 text-center sm:-mb-8">
                        <p className="text-xs">Generation data can be used to reproduce the same image or some similar styles with little adjustments.</p>
                        <p className="text-xs">Only public data is shown here, unless you must purchase the prompt.</p>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setMetaPopup(false)}></div>
        </div >
    )
}

export default GenerationData
