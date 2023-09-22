import React, { useEffect, useState } from "react";

import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import NFT from "../components/NFT";
import { nftData } from "../data";
import NFTPreview from "../components/NFTPreview";
import { generateImage } from "../helpers";

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
				<div className="container mx-auto pb-44 pt-16 px-4 relative h-scren grid grid-cols-2">
					{
						response ? (
							<div className="col-span-2 sm:col-span-1">
								<img src={response.output[0]} className="rounded" />
							</div>
						) : (
							<div></div>
						)
					}

					<div>
						<div className="flex flex-col items-center justify-center mb-8">
							<h1 className="font-bold text-4xl text-center">Generate NFTs from Text</h1>
							<p className="text-center text-lg">Generate NFTs from text using the power of AI.</p>
						</div>
						<div className="flex flex-col items-center justify-center mb-8">
							<div className="grid gap-4 grid-cols-2">
								<p className="self-center text-center text-lg">Prompt</p>
								<input onChange={(e) => setGenerateParams({ ...generateParams, prompt: e.target.value })} className="border border-gray-300 px-4 py-2 rounded text-black w-full" type="text" />
								<p className="self-center text-center text-lg">Negative Prompt</p>
								<input onChange={(e) => setGenerateParams({ ...generateParams, negative_prompt: e.target.value })} className="border border-gray-300 px-4 py-2 rounded text-black w-full" type="text" />
								<p className="self-center text-center text-lg">Size</p>
								<div className="flex gap-4 items-center justify-between group">
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 512] + " w-20 h-20 border-2 rounded flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 512 })}
									>
										<p className="text-center w-full">512x512</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 512 && generateParams.width === 768] + " w-32 h-20 border-2 rounded flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 512, width: 768 })}
									>
										<p className="text-center w-full">512x768</p>
									</div>
									<div className={`${imageSizeClass[generateParams.height === 768 && generateParams.width === 512] + " w-20 h-32 border-2 rounded flex items-center cursor-pointer"}`}
										onClick={() => setGenerateParams({ ...generateParams, height: 768, width: 512 })}
									>
										<p className="text-center w-full">768x512</p>
									</div>
								</div>
							</div>
							<button onClick={() => generate()} className="bg-gradient-to-t bg-primary-500 font-bold from-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-500 px-6 py-2 rounded text-white to-primary-400 z-20">Generate</button>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}