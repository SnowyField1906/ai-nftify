import React, { useEffect, useState } from "react";

import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import NFT from "../components/NFT";
import { nftData } from "../data";
import NFTPreview from "../components/NFTPreview";
import { generateImage, downloadImage } from "../helpers";
import { RiNftFill } from "react-icons/ri"

export default function Generate() {
	const [response, setResponse] = useState(null);
	const [onGenerate, setOnGenerate] = useState(false);
	const [generateParams, setGenerateParams] = useState({
		key: process.env.REACT_APP_STABLE_DIFFUSION_API,
		prompt: "",
		negative_prompt: "",
		width: 512,
		height: 512,
		samples: 1,
		num_inference_steps: 20,
		safety_checker: "no",
		enhance_prompt: "yes",
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

	const imageSizeClass = {
		true: "bg-gray-200 bg-opacity-40",
		false: "hover:bg-gray-200 hover:bg-opacity-40"
	};
	const previewSizeClass = (ratio) => ratio === 1 ? "w-[20rem] h-[20rem]" : ratio > 1 ? "w-[20rem] h-[30rem]" : "w-[30rem] h-[20rem]"

	const generate = async () => {
		setOnGenerate(true)
		const res = await generateImage(generateParams)
		setOnGenerate(false)
		setResponse(res)
	}

	return (
		<>
			<section className="bg-secondary-500 poster pt-4 relative text-opacity-60 text-white sm:px-4">
				<Navbar />
				<div className="container mx-auto pb-44 pt-16 px-4 relative h-scren grid grid-cols-2 justify-between gap-10">

					<div className="bg-black bg-opacity-50 p-10 rounded-3xl">
						<div className="flex flex-col items-center justify-center mb-20">
							<h1 className="font-bold text-4xl text-center">Generate NFTs from Text</h1>
							<p className="text-center text-lg">Generate NFTs from text using the power of AI.</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="grid grid-cols-3 gap-x-10 gap-y-5">
								<p className="self-center text-right text-lg font-semibold text-white">Prompt</p>
								<textarea onChange={(e) => setGenerateParams({ ...generateParams, prompt: e.target.value })} className="col-span-2 bg-gray-100 px-4 py-2 rounded-lg text-black w-full" type="text" />
								<p className="self-center text-right text-lg font-semibold text-white">Negative prompt</p>
								<textarea onChange={(e) => setGenerateParams({ ...generateParams, negative_prompt: e.target.value })} className="col-span-2  bg-gray-100 px-4 py-2 rounded-lg text-black w-full" type="text" />
								<p className="self-center text-right text-lg font-semibold text-white">Size</p>
								<div className="col-span-2 flex gap-4 items-center justify-between group">
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 512] + " w-20 h-20 border-2 rounded-lg flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 512 })}
									>
										<p className="text-center w-full text-gray-100">512x512</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 768] + " w-32 h-20 border-2 rounded-lg flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 768 })}
									>
										<p className="text-center w-full text-gray-100">512x768</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 768 && generateParams.width === 512] + " w-20 h-32 border-2 rounded-lg flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 768, width: 512 })}
									>
										<p className="text-center w-full text-gray-100">768x512</p>
									</div>
								</div>
								<p className="self-center text-right text-lg font-semibold text-white">Steps</p>
								<div className="col-span-2 flex">
									<input
										type="range" min="10" max="50" step="1" onChange={(e) => setGenerateParams({ ...generateParams, num_inference_steps: e.target.value })} defaultValue={generateParams.num_inference_steps}
										className="self-center transparent h-1 w-10/12 cursor-pointer appearance-none border-transparent bg-white bg-opacity-40 accent-white rounded-xl"
										id="customRange1" />
									<label for="customRange1" className="self-center text-lg text-right w-2/12 text-gray-100">{generateParams.num_inference_steps}</label>
								</div>
								<p className="self-center text-right text-lg font-semibold text-white">CFG scale</p>
								<div className="col-span-2 flex">
									<input
										type="range" min="1" max="20" step="0.1" onChange={(e) => setGenerateParams({ ...generateParams, guidance_scale: e.target.value })} defaultValue={generateParams.guidance_scale}
										className="self-center transparent h-1 w-10/12 cursor-pointer appearance-none border-transparent bg-white bg-opacity-40 accent-white rounded-xl"
										id="customRange1" />
									<label for="customRange1" className="self-center text-lg text-right w-2/12 text-gray-100">{generateParams.guidance_scale}</label>
								</div>
								<p className="self-center text-right text-lg font-semibold text-white">Seed</p>
								<input onChange={(e) => setGenerateParams({ ...generateParams, seed: e.target.value })} className=" col-span-2 bg-gray-100 px-4 py-2 rounded-lg text-black w-full" type="number" />
								<p className="self-center text-right text-lg font-semibold text-white">NSFW filter</p>
								<div className="col-span-2 flex">
									<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "yes" })}
										className="w-1/2 h-8 border-2 rounded-lg rounded-r-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-40" disabled={generateParams.safety_checker === "yes"}>
										<p className="text-center w-full text-gray-100">Yes</p>
									</button>
									<button onClick={() => setGenerateParams({ ...generateParams, safety_checker: "no" })}
										className="w-1/2 h-8 border-2 border-l-0 rounded-lg rounded-l-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-40" disabled={generateParams.safety_checker === "no"}>
										<p className="text-center w-full text-gray-100">No</p>
									</button>
								</div>
								<p className="self-center text-right text-lg font-semibold text-white">Enhance prompt</p>
								<div className="col-span-2 flex">
									<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "yes" })}
										className="w-1/2 h-8 border-2 rounded-lg rounded-r-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-40" disabled={generateParams.enhance_prompt === "yes"}>
										<p className="text-center w-full text-gray-100">Yes</p>
									</button>
									<button onClick={() => setGenerateParams({ ...generateParams, enhance_prompt: "no" })}
										className="w-1/2 h-8 border-2 border-l-0 rounded-lg rounded-l-none flex items-center cursor-pointer disabled:bg-gray-200 disabled:bg-opacity-40" disabled={generateParams.enhance_prompt === "no"}>
										<p className="text-center w-full text-gray-100">No</p>
									</button>
								</div>
							</div>
							<button onClick={() => generate()} className="my-10 bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 px-6 py-2 rounded-lg text-white to-primary-400 z-20 disabled:bg-primary-600 disabled:from-primary-600 disabled:to-primary-600" disabled={onGenerate}>
								Generate
							</button>
						</div>
					</div>
					<div className="flex flex-col items-center my-10">
						<div className={`${previewSizeClass(generateParams.height / generateParams.width) + " bg-white bg-opacity-10 border-2 border-dashed border-opacity-50 border-white rounded-lg grid self-center"}`}>
							{
								response ? (
									<div className="relative">
										<img src={response.output[0]} className="rounded" />
										<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center`}>
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
										</div>
									</div>
								) : (
									<div className="relative grid">
										<div className="self-center text-center text-xl">
											Preview Image
										</div>
										<div className={`${onGenerate ? "block" : "hidden"} absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center`}>
											<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
										</div>
									</div>
								)
							}
						</div>
						<div className="my-10">
							<button onClick={() => downloadImage(response.output[0])} className="ml-4 bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 px-6 py-2 rounded-lg text-white to-primary-400 z-20 disabled:bg-primary-600 disabled:from-primary-600 disabled:to-primary-600" disabled={!response}>
								<RiNftFill className="inline-block mr-2" /> Mint NFT
							</button>
						</div>
						<div className="w-full">
							<div className="bg-black bg-opacity-50 p-5 rounded-xl">
								<p className="text-left text-lg font-bold mb-10">Generation data</p>
								{
									response ?
										<p className="text-left">{response}</p>
										:
										<p className="text-center">Generate to view data</p>
								}
							</div>
						</div>
					</div>
				</div>
			</section >
			<Footer />
		</>
	);
}