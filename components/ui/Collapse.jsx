import React, { useState } from 'react';

const Collapse = (props) => {
    const [show,setShow]=useState(true)

    return (
        <div  className="mt-6 border-b border-gray-200">
            <h6 id="accordion-create-choose-type-multiple-heading-1" className={`text-nft_institutional text-lg font-medium ${show?'active':''}`}>
                <button type="button" onClick={()=>setShow(!show)} className="flex items-center justify-between w-full pb-6 font-medium text-left bg-white text-dark_mode" data-accordion-target="#accordion-create-choose-type-multiple-body-1" aria-expanded="true" aria-controls="accordion-create-choose-type-multiple-body-1">
                    <span>{props.title}</span>
                    {
                        show?(<svg data-accordion-icon="" className="w-6 h-6 shrink-0 rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>):
                        (<svg data-accordion-icon="" className="w-6 h-6  shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>)
                    }
                </button>
            </h6>
            <div id="accordion-create-choose-type-multiple-body-1" class={`mb-6 ${show?'':'hidden'}`} aria-labelledby="accordion-create-choose-type-multiple-heading-1">
                {props.children}
            </div>
        </div>
    );
}

export default Collapse;
