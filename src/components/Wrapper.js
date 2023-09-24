import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper({ children }) {
    return (
        <>
            <section className="bg-secondary-500 poster pt-4 mb-24 sm:px-4">
                <Navbar />
                <div className={`${window.location.pathname === '/' ? "bg-opacity-0" : "bg-gray-50"} container mx-auto mt-5 px-10 py-16 relative bg-gray-50 rounded-xl`}>
                    {children}
                </div>
            </section>
            <Footer />

        </>
    )
}

export default Wrapper
