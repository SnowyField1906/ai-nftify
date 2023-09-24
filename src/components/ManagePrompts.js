import React from 'react'

function ManagePrompts({ setManagePromptsPopup }) {
    return (
        <div className='fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none'>
            <div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-4/12">
                <div className="rounded-xl bg-white shadow-xl w-full p-5">
                    <h3 className="font-extrabold text-4xl text-primary-800 text-center mt-4">Manage prompts</h3>
                    <div className="py-10 px-6 sm:px-16">
                        <div className="mt-10 space-y-2 text-gray-600 text-center sm:-mb-8">
                            <p className="text-xs">Your charge will be only for gas fee calculated by the Bitcoin network.</p>
                            <p className="text-xs">We do not take any fees from your minting process.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-screen w-screen absolute -z-10' onClick={() => setManagePromptsPopup(false)}></div>
        </div>
    )
}

export default ManagePrompts
