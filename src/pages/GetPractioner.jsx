import { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';

function GetPraktisioner() {
  const { tokenDt } = useContext(SatsetContext);
  const [Loading, setLoading] = useState(false)
  const [nik, setNik] = useState("3603194611790001")
  const [numberIHS, setNumberIHS] = useState("")

  const getPatient = () => {
    setLoading(true)
    console.log("GET IHS", nik);

    axios({
      url: "/api/fhir-r4/v1/Practitioner?identifier=https://fhir.kemkes.go.id/id/nik|" + nik,
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt
      },
    })
      .then((res) => {
        console.log("RESPONSE :", res.data);
        setNumberIHS(res.data)
        setLoading(false)
      })

      .catch((err) => {
        console.log("ERROR :", err);
        setLoading(false)
      });
  }
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-2">
      <div className="font-bold text-xl mb-2">
        Get Praktisioner
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          NIK :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
        />
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
        onClick={() => getPatient()}
      >GET Praktisioner </button>
      {Loading === true ? "LOADING..." : (
        <div className="m-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Praktisioner RESPONSE : {numberIHS === "" ? "BELUM ADA IHS" : JSON.stringify(numberIHS)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Praktisioner NUMBER : {numberIHS === "" ? "BELUM ADA IHS" : (numberIHS.entry[0].resource.id)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Praktisioner TEXT : {numberIHS === "" ? "BELUM ADA IHS" : (numberIHS.entry[0].resource.name[0].text)}
          </label>
        </div>
      )}
      <div />
    </div>
  )
}

export default GetPraktisioner