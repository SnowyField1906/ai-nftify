import React, { useEffect, useState } from "react";

import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import NFT from "../components/NFT";
import { getAllRootStockNFTs } from "../data";
import NFTPreview from "../components/NFTPreview";
import { generateImage, downloadImage, fetchImage } from "../helpers";
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
		safety_checker: "no",
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
		true: "bg-gray-200 bg-opacity-30",
		false: "hover:bg-gray-200 hover:bg-opacity-30"
	};
	const previewSizeClass = (ratio) => ratio === 1 ? "w-[25rem] h-[25rem]" : ratio > 1 ? "w-[25rem] h-[40rem]" : "w-[40rem] h-[25rem]"

	const generate = async () => {
		setOnGenerate(true)
		const res = await generateImage(generateParams)

		if (res.status === "processing") {
			const image = await fetchImage(res.id)
			res.output = image.output
		}
		setOnGenerate(false)
		setResponse(res)
	}

	const inputClass = {
		true: "bg-white bg-opacity-0",
		false: "bg-gray-200 bg-opacity-30"
	}

	const [mintPopup, setMintPopup] = useState(false);

	return (
		<div className="h-scren grid grid-cols-2 justify-between gap-10">
			{mintPopup && <Mint response={response} setMintPopup={setMintPopup} />}

			<div className="bg-black bg-opacity-20 py-10 px-5 rounded-3xl">
				<div className="flex flex-col items-center justify-center mb-10">
					<h1 className="font-bold text-4xl text-center text-white">Generate NFTs from Text</h1>
					<p className="text-center text-lg text-primary-100">Generate NFTs from text using the power of AI.</p>
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className="grid grid-cols-4 gap-x-10 gap-y-5">
						<p className="self-center text-right text-lg font-semibold text-white">Prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, prompt: e.target.value })} className={`${inputClass[generateParams.prompt === ""]} col-span-3 h-24 p-3 border border-primary-white rounded-lg transition duration-200 focus:border-primary-400 focus:bg-primary-50 focus:bg-primary-100 bg-opacity-60 text-white focus:text-black font-normal text-lg focus:bg-opacity-60`} type="text" defaultValue={generateParams.prompt} />
						<p className="self-center text-right text-lg font-semibold text-white">Negative prompt</p>
						<textarea onChange={(e) => setGenerateParams({ ...generateParams, negative_prompt: e.target.value })} className={`${inputClass[generateParams.negative_prompt === ""]} col-span-3 h-24 p-3 border border-primary-white rounded-lg transition duration-200 focus:border-primary-400 focus:bg-primary-50 focus:bg-primary-100 bg-opacity-60 text-white focus:text-black font-normal text-lg focus:bg-opacity-60`} type="text" defaultValue={generateParams.negative_prompt} />
						<p className="self-center text-right text-lg font-semibold text-white">Size</p>
						<div className="col-span-3 flex gap-4 items-center justify-between group">
							<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 512] + " w-20 h-20 border rounded-lg flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 512 })}
							>
								<p className="text-center w-full text-white font-normal">512x512</p>
							</div>
							<div className={`${imageSizeClass[generateParams.height === 768 && generateParams.width === 512] + " w-20 h-32 border rounded-lg flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 768, width: 512 })}
							>
								<p className="text-center w-full text-white font-normal">512x768</p>
							</div>
							<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 768] + " w-32 h-20 border rounded-lg flex items-center cursor-pointer"}`}
								onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 768 })}
							>
								<p className="text-center w-full text-white font-normal">768x512</p>
							</div>
						</div>
						<p className="self-center text-right text-lg font-semibold text-white">Steps</p>
						<div className="col-span-3 flex">
							<input
								type="range" min="10" max="50" step="1" onChange={(e) => setGenerateParams({ ...generateParams, num_inference_steps: e.target.value })} defaultValue={generateParams.num_inference_steps}
								className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-300 bg-opacity-30 accent-white rounded-xl"
								id="customRange1" />
							<label for="customRange1" className="self-center text-lg text-right w-1/12 text-primary-100">{generateParams.num_inference_steps}</label>
						</div>
						<p className="self-center text-right text-lg font-semibold text-white">CFG scale</p>
						<div className="col-span-3 flex">
							<input
								type="range" min="1" max="20" step="0.5" onChange={(e) => setGenerateParams({ ...generateParams, guidance_scale: e.target.value })} defaultValue={generateParams.guidance_scale}
								className="self-center transparent h-1 w-full cursor-pointer appearance-none border-transparent bg-gray-300 bg-opacity-30 accent-white rounded-xl"
								id="customRange1" />
							<label for="customRange1" className="self-center text-lg text-right w-1/12 text-primary-100">{Number(generateParams.guidance_scale).toFixed(1)}</label>
						</div>
						<p className="self-center text-right text-lg font-semibold text-white">Seed</p>
						<input onChange={(e) => setGenerateParams({ ...generateParams, seed: e.target.value })} className={`${inputClass[generateParams.seed === null]} col-span-3 h-12 p-3 border border-primary-white rounded-full transition duration-200 focus:border-primary-400 focus:bg-primary-50 focus:bg-primary-100 bg-opacity-60 text-white focus:text-black font-normal text-lg focus:bg-opacity-60`} type="number" />
						<p className="self-center text-right text-lg font-semibold text-white">NSFW filter</p>
						<div className="col-span-3 flex">
							<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "yes" })}
								className="w-1/2 h-8 border rounded-full rounded-r-none flex items-center cursor-pointer font-normal disabled:bg-gray-200 disabled:bg-opacity-30" disabled={generateParams.safety_checker === "yes"}>
								<p className="text-center w-full text-white font-normal">Yes</p>
							</button>
							<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "no" })}
								className="w-1/2 h-8 border border-l-0 rounded-full rounded-l-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-30" disabled={generateParams.safety_checker === "no"}>
								<p className="text-center w-full text-white font-normal">No</p>
							</button>
						</div>
						<p className="self-center text-right text-lg font-semibold text-white">Enhance prompt</p>
						<div className="col-span-3 flex">
							<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "yes" })}
								className="w-1/2 h-8 border rounded-full rounded-r-none flex items-center cursor-pointer font-normal disabled:bg-gray-200 disabled:bg-opacity-30" disabled={generateParams.enhance_prompt === "yes"}>
								<p className="text-center w-full text-white font-normal">Yes</p>
							</button>
							<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "no" })}
								className="w-1/2 h-8 border border-l-0 rounded-full rounded-l-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-30" disabled={generateParams.enhance_prompt === "no"}>
								<p className="text-center w-full text-white font-normal">No</p>
							</button>
						</div>
					</div>
					<button onClick={() => generate()} className="mt-10 bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 px-6 py-2 rounded-full text-white to-primary-400 z-20 disabled:bg-gray-600 disabled:from-primary-600 disabled:to-primary-600" disabled={onGenerate}>
						Generate
					</button>
				</div>
			</div>
			<div className="flex flex-col items-center self-center">
				<div className={`${previewSizeClass(generateParams.height / generateParams.width) + " bg-gray-300 bg-opacity-10 border border-dashed border-opacity-60 border-white rounded-lg grid self-center"}`}>
					{
						response ? (
							<div className="relative">
								<img src={response.output[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} className="rounded" />
								<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center`}>
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
								</div>
							</div>
						) : (
							<div className="relative grid">
								<div className="self-center text-center text-xl text-white">
									Preview Image
								</div>
								<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-60 flex items-center rounded justify-center`}>
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
								</div>
							</div>
						)
					}
				</div>
				<div className="my-10">
					<button onClick={() => setMintPopup(true)} className="ml-4 bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 px-6 py-2 rounded-full text-white to-primary-400 z-20 disabled:bg-gray-600 disabled:from-primary-600 disabled:to-primary-600" disabled={!response || onGenerate}>
						<RiNftFill className="inline-block mr-2" /> Mint NFT
					</button>
				</div>
			</div>
			{
				response &&
				<div className="col-span-3 w-full  text-white">
					<div className="bg-black bg-opacity-20 p-5 rounded-xl">
						<h2 className=" text-2xl text-center py-5 font-bold mb-10">Generation data</h2>
						{
							<div className="grid grid-cols-4 gap-x-10 gap-y-5">
								<p className="">Generation Time</p>
								<p className="col-span-3 text-left">{response.generationTime} s</p>
								<p className="">Prompt</p>
								<p className="col-span-3 text-left">{response.meta.prompt}</p>
								<p className="">Negative Prompt</p>
								<p className="col-span-3 text-left">{response.meta.negative_prompt}</p>
								<p className="">Model</p>
								<p className="col-span-3 text-left">{response.meta.model}</p>
								<p className="">VAE</p>
								<p className="col-span-3 text-left">{response.meta.vae}</p>
								<p className="">Size</p>
								<p className="col-span-3 text-left">{response.meta.W}x{response.meta.H}</p>
								<p className="">Steps</p>
								<p className="col-span-3 text-left">{response.meta.steps}</p>
								<p className="">CFG scale</p>
								<p className="col-span-3 text-left">{response.meta.guidance_scale}</p>
								<p className="">Seed</p>
								<p className="col-span-3 text-left">{response.meta.seed}</p>
							</div>
						}
					</div>
				</div>
			}
		</div>
	);
}