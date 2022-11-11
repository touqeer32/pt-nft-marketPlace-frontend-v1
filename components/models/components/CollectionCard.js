import React from 'react';
import Router from 'next/router';

const CollectionCard = ({collection,closeMenu}) => {
    function redirect(){
        Router.push(`/collections/${collection.name}/${collection.address}`)
        closeMenu()
    }
    return (
            <figure onClick={()=>redirect()} className="flex flex-row items-center group relative left-0 hover:left-1 ease-out duration-300">
                <a href="#" className="absolute top-0 left-0 w-full h-full indent-[-9999px]">more</a>
                <img src={collection.image} alt={collection.name} className="w-16 h-16 rounded-xl border-2 border-solid border-gray-100 object-cover shadow-[6px_6px_0px_-1px_rgba(237,237,237,0.75)]" />
                <figcaption className="ml-4">
                    <span className="block text-dark_mode text-sm font-semibold group-hover:text-gray-300">
                        {collection.name}
                    </span>
                    <span className="block mt-1 text-xs text-gray-300">
                        {collection.descritpion}
                    </span>
                </figcaption>
            </figure>
    );
}

export default CollectionCard;
