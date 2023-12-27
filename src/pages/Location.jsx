import { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';

function Location() {
  const { tokenDt } = useContext(SatsetContext);
  const [Loading, setLoading] = useState(false)
  const [resLocation, setResLocation] = useState("")
  const [LocationID, setLocationID] = useState("c63ae084-0449-4f7b-b4c4-b1e4341c2e53")

  const getLocation = () => {
    setLoading(true)
    console.log("GET Location", LocationID);

    axios({
      url: "/api/fhir-r4/v1/Location/" + LocationID,
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt

      },

      // Attaching the form data

    })
      // Handle the response from backend here
      .then((res) => {
        console.log("RESPONSE :", res.data);
        setResLocation(res.data)
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
      <div className="font-bold text-xl mb-2">
        Get Location
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          ID LOCATION :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={LocationID}
          onChange={(e) => setLocationID(e.target.value)}
        />
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
        onClick={() => getLocation()}
      >GET LOCATION </button>
      {Loading === true ? "LOADING..." : (
        <div className="m-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION RESPONSE : {resLocation === "" ? "BELUM ADA LOCATION" : JSON.stringify(resLocation)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION DESCRIPTION : {resLocation === "" ? "BELUM ADA LOCATION" : (resLocation.description)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION NAME : {resLocation === "" ? "BELUM ADA LOCATION" : (resLocation.name)}
          </label>
        </div>
      )}
      <div />
    </div>
  )
}



export default Location