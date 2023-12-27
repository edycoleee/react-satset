import React, { useContext, useState } from 'react'
import { base_url } from '../util';
import { SatsetContext } from './Context';
import axios from 'axios';

function GetIHS() {
    const { tokenDt } = useContext(SatsetContext);
    const [Loading, setLoading] = useState(false)
    const [nik, setNik] = useState("3374060709780006")
    const [numberIHS, setNumberIHS] = useState("")
    const getPatient = () => {
        setLoading(true)
        console.log("GET IHS",nik);

        let dataKirim = ""
        axios({
            // Endpoint to send files
            url: base_url + nik,
            method: "GET",
            headers: {
                // Add any auth token here
                //authorization: "your token comes here",
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': 'Bearer'+""+{tokenDt}
            },

            // Attaching the form data
            data: dataKirim,
        })
            // Handle the response from backend here
            .then((res) => {
                console.log("RESPONSE :", res.data);
                //console.log("RESPONSE NIK:", res.data.access_token);
                //setNumberIHS(res.data.access_token)
                setLoading(false)
            })

            // Catch errors if any
            .catch((err) => {
                console.log("ERROR :", err);
                setLoading(false)
            });

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
                    value={nik}
                    onChange={(e)=>setNik(e.target.value)}
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