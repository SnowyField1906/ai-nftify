import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Wrapper({ children }) {
    return (
        <>
            <section className="bg-secondary-500 poster pt-4 sm:px-4">
                <Navbar />
                <div className="container mx-auto pb-44 pt-16 px-4 relative py-8">
                    {children}
                </div>
            </section>
            <Footer />

        </>
    )
}

export default Wrapper
