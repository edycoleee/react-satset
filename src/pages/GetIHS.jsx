import React, { useState } from 'react'

function GetIHS() {
    const [Loading, setLoading] = useState(false)
    const [numberIHS, setNumberIHS] = useState("")

    const getPatient = () => {
        console.log("GET IHS");

    }
    return (

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-2">
            <h4>
                Get Patient
            </h4>
            <div className="m-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    NIK :
                </label>
                <input
                    className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                     />
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
                onClick={() => getPatient()}
                >GET IHS </button>
                {Loading===true ? "LOADING..." : (
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        IHS Number : {numberIHS==="" ? "BELUM ADA IHS" : numberIHS}
                    </label>
                </div>
                )}
            <div />
        </div>
    )
}

export default GetIHS