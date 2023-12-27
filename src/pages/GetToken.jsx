import React, { useState } from 'react'
import { auth_url, clientID, clientSecret } from '../util';
import axios from 'axios';

function GetToken() {

const [tokenDt, setTokenDt] = useState("")
const [Loading, setLoading] = useState(false)

    const getToken = () => {
        setLoading(true)
        console.log("GET TOKEN");

        let formData = new FormData();

        // Adding files to the formdata
        formData.append("image", "newfiles");
        formData.append("name", "Name");


        let dataKirim = {
            client_id: clientID,
            client_secret: clientSecret
        }

        axios({
            // Endpoint to send files
            url: auth_url,
            method: "POST",
            headers: {
                // Add any auth token here
                //authorization: "your token comes here",
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            // Attaching the form data
            data: dataKirim,
        })
            // Handle the response from backend here
            .then((res) => {
                console.log("RESPONSE :", res.data);
                console.log("RESPONSE ACCESS TOKEN:", res.data.access_token);
                setTokenDt(res.data.access_token)
                setLoading(false)
            })

            // Catch errors if any
            .catch((err) => {
                console.log("ERROR :", err);
                setLoading(false)
            });


    }
    return (
        <div >
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-2">
                <h4>
                    GetToken
                </h4>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        BASE URL :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={auth_url}
                        disabled />
                </div>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        CLIENT ID :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={clientID}
                        disabled />
                </div>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        CLIENT SECRET :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={clientSecret}
                        disabled />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
                onClick={() => getToken()}
                >GET TOKEN</button>
                {Loading===true ? "LOADING..." : (
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        TOKEN : {tokenDt==="" ? "BELUM ADA TOKEN" : tokenDt}
                    </label>
                </div>
                )}
            </div>
        </div>
    )
}

export default GetToken