import React,{useState} from 'react'
import ActivityLayout from "../../../components/layouts/ActivityLayout";

export default function MyActivity() {
    const [tab, setTab] = useState(1)

    return (
        <div className="basis-8/12">
            <div className="inline-block border-b border-gray-200">
                <ul className="nft__tablist flex flex-wrap text-base font-semibold text-center" data-tabs-toggle="#tab-my-activity" role="tablist">
                    <li className="mr-8" role="presentation">
                        <button onClick={()=>setTab(1)} className="inline-block p-0 pb-2 border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500" id="tab-recent-bids" data-tabs-target="#recent-bids" type="button" role="tab" aria-controls="recent-bids" aria-selected={tab==1}>
                            Recent Bids
                            <span className="ml-3">156</span>
                        </button>
                    </li>
                    <li className="mr-8" role="presentation">
                        <button onClick={()=>setTab(2)} className="inline-block p-0 pb-2 border-b-2 dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" id="tab-recent-sales" data-tabs-target="#recent-sales" type="button" role="tab" aria-controls="recent-sales" aria-selected={tab==2}>
                            Recent Sales
                            <span className="ml-3">20</span>
                        </button>
                    </li>
                    <li className="last:mr-0" role="presentation">
                        <button onClick={()=>setTab(3)} className="inline-block p-0 pb-2 border-b-2 dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" id="tab-recent-purchases" data-tabs-target="#recent-purchases" type="button" role="tab" aria-controls="recent-purchases" aria-selected={tab==3}>
                            Recent Purchases
                            <span className="ml-3">0</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div id="tab-my-activity" className="mt-10">
                <div className={tab==1?'':'hidden'} id="recent-bids" role="tabpanel" aria-labelledby="tab-recent-bids">
                    <div className="nft__custom-table mt-6">
                        <ul className="nft__custom-table-heading grid grid-cols-7 gap-5 px-3">
                            <li>
                                <span className="text-gray-300">
                                    Price
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-300">
                                    USD Price
                                </span>
                            </li>
                            <li>
                                <span className="text-gray-300">
                                    Floor Diff.
                                </span>
                            </li>
                            <li className="col-span-2">
                                <span className="text-gray-300">
                                    Timestamp
                                </span>
                            </li>
                            <li className="col-span-2">
                                <span className="text-gray-300">
                                    From
                                </span>
                            </li>
                        </ul>
                        <ul className="nft__custom-table-rows grid grid-cols-7 gap-5 py-3 px-3 mt-4 rounded-lg border border-solid border-gray-200 bg-gray-100/30 hover:bg-gray-100">
                            <li>
                                <span className="text-dark_mode">
                                1.05 ETH
                                </span>
                            </li>
                            <li>
                                <span className="text-nft_institutional">
                                1,569.32 $
                                </span>
                            </li>
                            <li>
                                <span className="text-dark_mode">
                                8% below
                                </span>
                            </li>
                            <li className="col-span-2">
                                <span className="text-dark_mode">
                                2022-07-18 10:04
                                </span>
                            </li>
                            <li className="col-span-2">
                                <span className="text-dark_mode">
                                <a href="#" className="underline text-dark_mode hover:text-nft_institutional">Rarepep</a>
                                </span>
                            </li>
                            </ul>
                    </div>
                    <div className="nft__load-more-button flex justify-center mt-10">
                        <button type="button" className="py-3 px-12 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300">
                            Load more
                        </button>
                    </div>
                </div>
                <div className={tab==2?'':'hidden'} id="recent-sales" role="tabpanel" aria-labelledby="tab-recent-sales">
                    <span>Tab content - Recent Sales</span>
                </div>
                <div className={tab==3?'':'hidden'} id="recent-purchases" role="tabpanel" aria-labelledby="tab-recent-purchases">
                    <span>Tab content - Recent Purchases</span>
                </div>
            </div>
        </div>
    )
}
MyActivity.Layout = ActivityLayout