import React from 'react'
import { webInfo, socialMediaLinks } from './constants'
import { logo } from './assets'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <footer class="bg-bgColor2">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0">
                        <Link to="/" class="flex items-center flex-wrap">
                            <img src={logo} class="h-8 me-3" alt={webInfo.webName} />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{webInfo.webName}</span>
                        </Link>
                    </div>
                    <div class="flex md:w-1/2 justify-center">
                        
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-textColor">Follow us</h2>
                            <ul class="text-textColorMiddle flex gap-4 flex-col sm:flex-row sm:flex-wrap">
                                {socialMediaLinks.map((lnk) => (
                                    <li key={lnk.name}>
                                        <a href={lnk.link} target='_blank' class="hover:text-textColor ">{<lnk.icon />}</a>
                                    </li>
                                ))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div class="text-center">
                    <span class="text-sm text-white">Developed by: <a href={webInfo.webDeveloperLink} target='_blank' className='text-green-500'>{webInfo.webDeveloper}</a></span>
                </div>
            </div>
        </footer>

    )
}

export default Footer;