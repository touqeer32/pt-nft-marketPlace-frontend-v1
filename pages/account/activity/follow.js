import React,{useState} from 'react'
import ActivityLayout from "../../../components/layouts/ActivityLayout";

export default function Follow() {
    const [tab, setTab] = useState(1)
    return (
        <div className="basis-9/12">
            <div className="inline-block border-b border-gray-200">
                <ul className="nft__tablist flex flex-wrap text-base font-semibold text-center" data-tabs-toggle="#tab-follow" role="tablist">
                    <li className="mr-8" role="presentation">
                        <button onClick={()=>setTab(1)} className="inline-block p-0 pb-2 border-b-2" id="tab-followings" data-tabs-target="#followings" type="button" role="tab" aria-selected={tab==1}>
                            Followings
                            <span className="ml-3">115</span>
                        </button>
                    </li>
                    <li className="last:mr-0" role="presentation">
                        <button onClick={()=>setTab(2)} className="inline-block p-0 pb-2 border-b-2" id="tab-followers" data-tabs-target="#followers" type="button" role="tab" aria-controls="followers" aria-selected={tab==2}>
                            Followers
                            <span className="ml-3">20</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div id="tab-follow" className="mt-10">
                <div className={tab==1?'':'hidden'} id="followings" role="tabpanel" aria-labelledby="tab-followings">
                    <div className="grid grid-cols-3 gap-4">

                        <div className="nft__card-follow flex flex-row items-center py-4 px-2 border border-solid border-gray-100 rounded-xl hover:bg-gray-100">
                            <figure className="flex flex-row items-start ml-4">
                                <img src="/avatars/avatar-4.jpg" alt="Avatar 4" className="w-14 h-14 rounded-full border-2 border-solid border-gray-100 object-cover" />
                                <figcaption className="mt-2 ml-4">
                                    <span className="block text-dark_mode text-sm font-semibold">
                                        Apocalypse Monkeys
                                    </span>
                                    <span className="block text-sm text-gray-300">
                                        @apo_monkeys
                                    </span>
                                    <div className="mt-4 flex items-center">
                                        <span className="text-sm text-gray-300">
                                            0x2acAb3…31bA17B
                                        </span>
                                        <i className="fa-regular fa-copy text-gray-300 ml-4 text-base hover:text-dark_mode cursor-pointer" data-tooltip-target="tooltip-animation" data-tooltip-placement="right" type="button">
                                        </i>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="nft__load-more-button flex justify-center mt-10">
                        <button type="button" className="py-3 px-12 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
                            Load more
                        </button>
                    </div>
                </div>
                <div className={tab==2?'':'hidden'} id="followers" role="tabpanel" aria-labelledby="tab-followers">
                    <span>Tab content - Followers</span>
                </div>
            </div>
        </div>
    )
}
Follow.Layout = ActivityLayout
