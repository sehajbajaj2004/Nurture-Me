import React from 'react'
import { styles } from '../style'

import {EmojiCanvas} from './canvas';



const Hero = () => {
    return (
        <>
            <section className='relative w-full h-screen mx-auto'>
                <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex items-start gap-5`}>
                    <div className='flex flex-row justify-center items-start mt-5 gap-10'>
                        <div className='h-[500px] w-[500px]'>
                         <EmojiCanvas />
                        </div>
                        <div className='py-28 mx-5'>
                            <h1 className={`${styles.heroHeadText2}`}>Hi, <span className='text-[#ffffff]'>Sehaj</span>
                            <br /> How are you doing today?</h1>
                            {/* <p className={`${styles.heroSubText} text-white-100 mt-2`}>
                                How are you doing today?
                            </p> */}
                        </div>
                    </div>
                </div>
                
            </section>

        </>
    )
}

export default Hero