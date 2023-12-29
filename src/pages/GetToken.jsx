import { useContext, useState } from 'react'
import { clientID, clientSecret } from '../util';
import axios from 'axios';
import { SatsetContext } from './Context';

function GetToken() {
    const { tokenDt, setTokenDt, OrgId, setOrgId } = useContext(SatsetContext);
    const [Loading, setLoading] = useState(false)

    const [CliId, setCliId] = useState(clientID)
    const [CliSec, setCliSec] = useState(clientSecret)

    const getToken = () => {
        setLoading(true)
        console.log("GET TOKEN");

        let dataKirim = {
            client_id: CliId,
            client_secret: CliSec
        }

        axios({
            url: "/api/oauth2/v1/accesstoken?grant_type=client_credentials",
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: dataKirim,
        })
            .then((res) => {
                console.log("RESPONSE :", res.data);
                console.log("RESPONSE ACCESS TOKEN:", res.data.access_token);
                setTokenDt(res.data.access_token)
                setLoading(false)
            })
            .catch((err) => {
                console.log("ERROR :", err);
                setLoading(false)
            });
    }
    return (
        <div >
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-2">
                <div className="font-bold text-xl mb-2">
                    GetToken
                </div>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        ORGANISATION ID :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={OrgId}
                        onChange={(e) => setOrgId(e.target.value)}
                    />
                </div>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        CLIENT ID :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={CliId}
                        onChange={(e) => setCliId(e.target.value)}
                    />
                </div>
                <div className="m-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        CLIENT SECRET :
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={CliSec}
                        onChange={(e) => setCliSec(e.target.value)}
                    />
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
                    onClick={() => getToken()}
                >GET TOKEN</button>
                {Loading === true ? "LOADING..." : (
                    <div className="m-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            TOKEN : {tokenDt === "" ? "BELUM ADA TOKEN" : tokenDt}
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetToken