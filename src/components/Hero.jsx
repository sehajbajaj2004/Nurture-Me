import React from 'react'
import { styles } from '../style'

import { EmojiCanvas } from './canvas';

const Hero = () => {
    return (
        <>
            <section className='relative w-full h-[485px] mx-auto mb-28 mt-14'>
                <div className={`${styles.paddingX} absolute inset-0 top-[55px] max-w-7xl mx-auto flex items-start gap-5`}>
                    <div className='flex flex-row justify-center items-start mt-5 gap-3'>
                        <div className='h-[500px] w-[800px] cursor-grab'>
                            <EmojiCanvas />
                        </div>
                        
                        <div className='py-28 mx-14'>
                            <h1 className={`${styles.heroHeadText2} text-[#000000]`}>Hi, <span className='text-[#ffde20]'>Sehaj</span>
                                <br /> How are you doing today?</h1>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Hero