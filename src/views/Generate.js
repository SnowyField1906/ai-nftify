import { useEffect, useState } from "react";

import { generateImage, fetchImage } from "../helpers";
import { RiNftFill } from "react-icons/ri"
import Mint from "../components/Mint";

export default function Generate() {
	const [response, setResponse] = useState(null);
	const [onGenerate, setOnGenerate] = useState(false);
	const [generateParams, setGenerateParams] = useState({
		prompt: "",
		negative_prompt: "(worst quality, low quality, large head, extra digits:1.4) ",
		width: 512,
		height: 512,
		samples: 1,
		num_inference_steps: 20,
		safety_checker: "yes",
		enhance_prompt: "no",
		seed: null,
		guidance_scale: 7.5,
		multi_lingual: "no",
		panorama: "no",
		self_attention: "no",
		upscale: "no",
		embeddings_model: null,
		webhook: null,
		track_id: null
	});

	useEffect(() => {
		if (generateParams.seed === "") {
			setGenerateParams({ ...generateParams, seed: null })
		}
	}, [generateParams.seed])

	const imageSizeClass = {
		true: "bg-white border-primary-500 text-primary-500",
		false: "bg-gray-200 hover:bg-white text-gray-500 border-gray-300"
	};

	const inputClass = {
		false: "bg-white border-primary-500 text-primary-500",
		true: "bg-gray-200 text-gray-500 border-gray-300",
	}

	const previewSizeClass = (ratio) => ratio === 1 ? "w-[25rem] h-[25rem]" : ratio > 1 ? "w-[25rem] h-[40rem]" : "w-[40rem] h-[25rem]"

	const generate = async () => {
		setOnGenerate(true)
		setResponse(null)
		const res = await generateImage(generateParams)

		if (res.status === "processing") {
			const image = await fetchImage(res.id)
			res.output = image.output
		} else if (res.status === "failed" || res.status === "error") {
			setResponse("failed")
			setOnGenerate(false)
			return
		}

		setOnGenerate(false)
		setResponse(res)
	}

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

	const [mintPopup, setMintPopup] = useState(false);

	return (
		<div className="lg:grid lg:grid-cols-2 flex flex-col justify-between gap-10">
			{mintPopup && <Mint response={response} setMintPopup={setMintPopup} />}

			<div className="rounded-3xl text-gray-800">
				<h1 className="font-extrabold text-4xl text-white mix-blend-lighten">Turn your imagination into NFTs</h1>
				<div className="mt-16 flex flex-col items-center justify-center">
					<div className="grid grid-cols-4 gap-x-10 gap-y-5 z-20">
						<p className="self-center text-right text-lg font-semibold">Prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, prompt: e.target.value })} className={`${inputClass[generateParams.prompt === ""]} col-span-3 h-24 p-3 rounded-2xl border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} type="text" defaultValue={generateParams.prompt} />
						<p className="self-center text-right text-lg font-semibold">Negative prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, negative_prompt: e.target.value })} className={`${inputClass[generateParams.negative_prompt === ""]} col-span-3 h-24 p-3 rounded-2xl border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} type="text" defaultValue={generateParams.negative_prompt} />
						<p className="self-center text-right text-lg font-semibold">Size</p>
						<div className="col-span-3 flex gap-4 items-center justify-between group">
							<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 512] + " w-20 h-20 border-2 rounded-2xl flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 512 })}
							>
								<p className="text-center font-semibold w-full">512x512</p>
							</div>
							<div className={`${imageSizeClass[generateParams.height === 768 && generateParams.width === 512] + " w-20 h-32 border-2 rounded-2xl flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 768, width: 512 })}
							>
								<p className="text-center font-semibold w-full">512x768</p>
							</div>
							<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 768] + " w-32 h-20 border-2 rounded-2xl flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 768 })}
							>
								<p className="text-center font-semibold w-full">768x512</p>
							</div>
						</div>
						<p className="self-center text-right text-lg font-semibold">Steps</p>
						<div className="col-span-3 flex">
							<input
								type="range" min="10" max="50" step="1" onChange={(e) => setGenerateParams({ ...generateParams, num_inference_steps: e.target.value })} defaultValue={generateParams.num_inference_steps}
								className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-200 accent-primary-500 rounded-full"
								id="customRange1" />
							<label for="customRange1" className="self-center text-lg text-right text-primary-500 w-1/12 font-semibold">{generateParams.num_inference_steps}</label>
						</div>
						<p className="self-center text-right text-lg font-semibold">CFG scale</p>
						<div className="col-span-3 flex">
							<input
								type="range" min="1" max="20" step="0.5" onChange={(e) => setGenerateParams({ ...generateParams, guidance_scale: e.target.value })} defaultValue={generateParams.guidance_scale}
								className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-200 accent-primary-500 rounded-full"
								id="customRange1" />
							<label for="customRange1" className="self-center text-lg text-right text-primary-500 w-1/12 font-semibold">{Number(generateParams.guidance_scale).toFixed(1)}</label>
						</div>
						<p className="self-center text-right text-lg font-semibold">Seed</p>
						<input onChange={(e) => setGenerateParams({ ...generateParams, seed: e.target.value })} className={`${inputClass[generateParams.seed === null]} col-span-3 w-full h-12 p-3 rounded-full border-2 cursor-text border-gray-200 flex items-center justify-center font-semibold`} type="number" />
						<p className="self-center text-right text-lg font-semibold">NSFW filter</p>
						<div className="col-span-3 flex">
							<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "yes" })}
								className={`${inputClass[generateParams.safety_checker !== "yes"]} rounded-full font-semibold border-2 cursor-pointer rounded-r-none h-12 w-1/2 flex items-center justify-center`}>
								<p className="text-center w-full">Yes</p>
							</button>
							<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "no" })}
								className={`${inputClass[generateParams.safety_checker !== "no"]} rounded-full font-semibold border-2 cursor-pointer rounded-l-none h-12 w-1/2 flex items-center justify-center`}>
								<p className="text-center w-full">No</p>
							</button>
						</div>
						<p className="self-center text-right text-lg font-semibold">Enhance prompt</p>
						<div className="col-span-3 flex">
							<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "yes" })}
								className={`${inputClass[generateParams.enhance_prompt !== "yes"]} rounded-full font-semibold border-2 cursor-pointer rounded-r-none h-12 w-1/2 flex items-center justify-center`}>
								<p className="text-center w-full">Yes</p>
							</button>
							<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "no" })}
								className={`${inputClass[generateParams.enhance_prompt !== "no"]} rounded-full font-semibold border-2 cursor-pointer rounded-l-none h-12 w-1/2 flex items-center justify-center`}>
								<p className="text-center w-full">No</p>
							</button>
						</div>
					</div>
					<div className='flex'>
						<button className={`${onGenerate ? "border-primary-500 cursor-default" : "hover:border-primary-500"} group h-12 w-40 mt-10 mx-auto border-2 border-gray-200 rounded-full transition duration-300 disabled:cursor-default disabled:pointer-events-none`} onClick={() => generate()} disabled={onGenerate}>
							<div className="relative flex items-center space-x-4 justify-center">
								<span className="block font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-600 sm:text-base">
									{
										!onGenerate ?
											"Summit"
											:
											<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
									}
								</span>
							</div>
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center self-center">
				<div className={`${previewSizeClass(generateParams.height / generateParams.width)} ${inputClass[typeof response !== "object" || response == null]} border-2 border-dashed rounded-xl grid self-center`}>
					{
						typeof response === "object" && response !== null ? (
							<div className="relative">
								<img src={response.output[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="rounded-xl" />
								<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
								</div>
							</div>
						) : (
							<div className="relative grid">
								<div className="self-center text-center text-xl w-full flex justify-center">
									{response === "failed" ?
										"Failed to generate image"
										: onGenerate ?
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
											: "Preview Image"
									}
								</div>
							</div>
						)
					}
				</div>
				<div className="my-10">
					<button className={`group h-12 w-40 mx-auto border-2 border-gray-200 hover:border-primary-500 rounded-full transition duration-300 disabled:cursor-default disabled:pointer-events-none`} onClick={() => setMintPopup(true)} disabled={typeof response !== "object" || response == null}>
						<div className="relative flex items-center space-x-4 justify-center">
							<span className="block font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-primary-600 sm:text-base">
								<RiNftFill className="inline-block mr-2" /> Mint NFT
							</span>
						</div>
					</button>
				</div>
			</div>
			{
				typeof response === "object" && response !== null &&
				<div className="col-span-3 w-full ">
					<div className="border-2 border-dashed border-gray-300 bg-gray-200 p-5 rounded-xl">
						<h2 className=" text-2xl text-primary-800 text-center font-bold mb-10">Generation data</h2>
						{
							<div className="grid grid-cols-6 gap-x-10 gap-y-5 items-center">
								<p className="font-semibold">Generation Time</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.generationTime)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.generationTime} s
								</p>
								<p className="font-semibold">Prompt</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.prompt)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.prompt}
								</p>
								<p className="font-semibold">Negative Prompt</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.negative_prompt)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.negative_prompt}
								</p>
								<p className="font-semibold">Model</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.model)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.model}
								</p>
								<p className="font-semibold">VAE</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.vae)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.vae}
								</p>
								<p className="font-semibold">Size</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.W + "x" + response.meta.H)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.W}x{response.meta.H}
								</p>
								<p className="font-semibold">Revision</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.revision}
								</p>
								<p className="font-semibold">Steps</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.steps)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.steps}
								</p>
								<p className="font-semibold">CFG scale</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.guidance_scale)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.guidance_scale}
								</p>
								<p className="font-semibold">Seed</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full" onClick={() => copyText(response.meta.seed)}>
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.seed}
								</p>
								<p className="font-semibold">NSFW filter</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.safetychecker}
								</p>
								<p className="font-semibold">Attention slicing</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.enable_attention_slicing}
								</p>
								<p className="font-semibold">Instant response</p>
								<p className="group relative col-span-5 hover:bg-gray-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:text-primary-800 hover:font-semibold w-full">
									<span className="pointer-events-none absolute right-4 opacity-0 font-semibold transition-opacity group-hover:opacity-100">
										{copy}
									</span>
									{response.meta.instant_response}
								</p>
							</div>
						}
					</div>
				</div>
			}
		</div>
	);
}