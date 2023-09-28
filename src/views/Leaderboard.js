import { useEffect, useState } from "react";

import { getRanking, getUsers } from "../helpers";
import { Link } from "react-router-dom";

export default function LeaderBoard() {
    const [users, setUsers] = useState({})
    const [onQuery, setOnQuery] = useState(true)
    const [ranking, setRanking] = useState([])

    // async
    useEffect(() => {
        const fetchData = async () => {
            const rawUsers = await getUsers()
            const users = {}
            rawUsers.forEach(user => { users[user.id] = user })

            const ranking = await getRanking()

            setRanking(ranking)
            setUsers(users)
            setOnQuery(false)
        }

        fetchData()
    }, [])

    const textIndexColor = [
        'text-red-500',
        'text-blue-500',
        'text-yellow-500',
    ]

    return (
        <>
            <div className="flex flex-wrap gap-2 items-center mb-6">
                <div className="w-full z-10 flex justify-between items-center">
                    <h1 className="font-extrabold text-4xl text-white mix-blend-lighten">Explore our experts</h1>
                </div>
            </div>
            <div className="flex justify-between mt-24 gap-x-5">
                <div className="grid gap-y-3 z-20">
                    <p className="text-xl font-semibold mb-5 text-gray-600 text-center">TOP NFT SELLERS</p>
                    {
                        onQuery ?
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                            :
                            ranking.sort((a, b) => b.numSold - a.numSold).slice(0, 5).map((rank, index) => (
                                <div className="group relative">
                                    <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                    <Link to={`/profile/${users[rank.id].id}`}>
                                        <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                            <span className="flex items-center space-x-3">
                                                <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                            </span>
                                            <span className="invisible group-hover:visible pl-3 ml-3 text-primary-400 transition duration-200">
                                                View&nbsp;&rarr;
                                            </span>
                                            <span className="visible group-hover:invisible pl-3 text-primary-400 transition duration-200 -translate-x-10">
                                                {rank.numSold}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    }
                </div>
                <div className="grid gap-y-3 z-20">
                    <p className="text-xl font-semibold mb-5 text-gray-600 text-center">TOP DATA SELLERS</p>
                    {
                        onQuery ?
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                            :
                            ranking.sort((a, b) => b.numPromptSold - a.numPromptSold).slice(0, 5).map((rank, index) => (
                                <div className="group relative">
                                    <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                    <Link to={`/profile/${users[rank.id].id}`}>
                                        <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                            <span className="flex items-center space-x-3">
                                                <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                            </span>
                                            <span className="invisible group-hover:visible pl-3 ml-3 text-primary-400 transition duration-200">
                                                View&nbsp;&rarr;
                                            </span>
                                            <span className="visible group-hover:invisible pl-3 text-primary-400 transition duration-200 -translate-x-10">
                                                {rank.numPromptSold}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    }
                </div>
                <div className="grid gap-y-3 z-20">
                    <p className="text-xl font-semibold mb-5 text-gray-600 text-center">TOP NFT BUYERS</p>
                    {
                        onQuery ?
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                            :
                            ranking.sort((a, b) => b.numPurchased - a.numPurchased).slice(0, 5).map((rank, index) => (

                                <div className="group relative">
                                    <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                    <Link to={`/profile/${users[rank.id].id}`}>
                                        <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                            <span className="flex items-center space-x-3">
                                                <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                            </span>
                                            <span className="invisible group-hover:visible pl-3 ml-3 text-primary-400 transition duration-200">
                                                View&nbsp;&rarr;
                                            </span>
                                            <span className="visible group-hover:invisible pl-3 text-primary-400 transition duration-200 -translate-x-10">
                                                {rank.numPurchased}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    }
                </div>
                <div className="grid gap-y-3 z-20">
                    <p className="text-xl font-semibold mb-5 text-gray-600 text-center">TOP DATA BUYERS</p>
                    {
                        onQuery ?
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
                            :
                            ranking.sort((a, b) => b.numPromptPurchased - a.numPromptPurchased).slice(0, 5).map((rank, index) => (

                                <div className="group relative">
                                    <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-10 hover:opacity-50 blur transition duration-100 group-hover:opacity-100 group-hover:duration-100"></div>
                                    <Link to={`/profile/${users[rank.id].id}`}>
                                        <div className="relative flex items-center justify-between rounded-lg bg-gray-50 pl-5 py-3 leading-none place-items-center">
                                            <span className="flex items-center space-x-3">
                                                <p className={`${textIndexColor[index]} text-base font-bold text-gray-500`}>{index + 1}</p>
                                                <img src={users[rank.id].picture} className={`${textIndexColor[index]} w-12 h-12 rounded-full border-2 border-white border-opacity-0 hover:border-opacity-100`} alt="..." />
                                                <p className={`${textIndexColor[index]} text-base font-semibold text-gray-500`}>{users[rank.id].name}</p>
                                            </span>
                                            <span className="invisible group-hover:visible pl-3 ml-3 text-primary-400 transition duration-200">
                                                View&nbsp;&rarr;
                                            </span>
                                            <span className="visible group-hover:invisible pl-3 text-primary-400 transition duration-200 -translate-x-10">
                                                {rank.numPromptPurchased}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))
                    }
                </div>
            </div >
        </>
    );
}