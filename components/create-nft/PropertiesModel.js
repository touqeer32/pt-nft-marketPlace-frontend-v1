import {
  faCircleXmark,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export default function PropertiesModel({ onClose ,storeProperties,defaultProperties}) {
  const [properties, setProperties] = useState([{key:'',value:''}])

  useEffect(()=>{
    if(defaultProperties){
      setProperties(defaultProperties)
    }
  },[defaultProperties])
  
  function addProperties(){
    var newProperties=properties
    newProperties.push({key:'',value:''})
    setProperties([...newProperties])
  }

  function setValueByKey(index,key,value){
    properties[index][key]=value;
  }

  function removeProperty(index){
    var newProperties=properties
    newProperties.splice(index,1)
    setProperties([...newProperties])
  }
  
  function save(){
    onClose()
    storeProperties(properties)
  }

  return (
    <aside
      id="modal-properties"
      tabIndex="-1"
      className="nft__modal flex justify-center items-center overflow-y-auto overflow-x- fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full outline-none"
    >
      <div className="relative p-6 w-full max-w-4xl h-full md:h-auto">
        <div className="relative bg-white rounded-md shadow px-8 py-6">
          <div className="flex justify-between items-center">
            <h6 className="text-dark_mode text-lg font-semibold">Properties</h6>
            <button
              type="button"
              data-modal-toggle="modal-properties"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-gray-300 text-2xl hover:text-dark_mode hover:rotate-90 ease-out duration-300"
              />
            </button>
          </div>
          <div className="mt-16">
            <form  id="properties">
              {
                properties.map((property,index)=>{
                  return (
                    <div className="flex items-center gap-4" key={index}>
                      <div className="block basis-1/2">
                        <label
                          htmlFor="key-1"
                          className=" mb-2 text-dark_mode text-sm font-semibold"
                        >
                          Key*
                        </label>
                        <input
                          name="key_1"
                          defaultValue={property.key}
                          id="key-1"
                          className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                          placeholder="Type key"
                          onChange={(e)=>setValueByKey(index,'key',e.target.value)}
                          autoComplete="off"
                          required
                        />
                      </div>
                      <div className="block basis-1/2">
                        <label
                          htmlFor="value-1"
                          className=" mb-2 text-dark_mode text-sm font-semibold"
                        >
                          Value*
                        </label>
                        <input
                          name="value_1"
                          id="value-1"
                          defaultValue={property.value}
                          onChange={(e)=>setValueByKey(index,'value',e.target.value)}
                          className="block p-4 w-full text-dark_mode text-sm font-medium placeholder:text-gray-300 placeholder:font-normal bg-gray-300/20 rounded-lg border-none focus:outline-none focus:ring-1 focus:ring-gray-300/60 focus:bg-gray-300/30 hover:bg-gray-300/30"
                          placeholder="Type value"
                          autoComplete="off"
                          required
                        />
                      </div>
                      {
                        index==0?(
                          <button
                            type="button"
                            onClick={()=>addProperties()}
                            className="w-14 h-12 mt-5 flex items-center justify-center rounded-lg border border-solid border-gray-200 bg-white hover:bg-gray-100 hover:scale-[0.97] ease-out duration-300"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-dark_mode" />
                          </button>
                        ):(
                          <button
                            onClick={()=>removeProperty()}
                            type="button"
                            className="w-14 mt-5 h-12 flex items-center justify-center rounded-lg border border-solid border-error/50 bg-error/20 hover:bg-error/40 hover:scale-[0.97] ease-out duration-300"
                          >
                            <FontAwesomeIcon
                              icon={faMinus}
                              className="fa-solid fa-minus text-error"
                            />
                          </button>
                        )
                      }
                    </div>
                  )
                })
              }
              <div className="flex justify-end mt-10">
                <button
                  onClick={()=>save()}
                  type="button"
                  className="min-h-[44px] py-2 px-6 flex items-center justify-center rounded-full bg-dark_mode text-light_mode text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark_mode active:scale-[0.94] hover:scale-[0.97] ease-out duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
