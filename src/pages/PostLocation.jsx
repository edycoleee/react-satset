import React, { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';

function PostLocation() {
  const { tokenDt } = useContext(SatsetContext);
  const [Loading, setLoading] = useState(false)
  const [resLocation, setResLocation] = useState("")
  const [nameLocation, setNameLocation] = useState("")
  const [LocationID, setLocationID] = useState("c63ae084-0449-4f7b-b4c4-b1e4341c2e53")

  const DataLocation = {
    "resourceType": "Location",
    "identifier": [
      {
        "system": "http://sys-ids.kemkes.go.id/location/100025702",
        "value": "RJ002"
      }
    ],
    "status": "active",
    "name": "Ruang Klinik 1",
    "description": "Ruang 1, Poliklinik Anak, Lantai 1, Gedung Poliklinik",
    "mode": "instance",
    "telecom": [
      {
        "system": "phone",
        "value": "024-76602154",
        "use": "work"
      },
      {
        "system": "url",
        "value": "http://rsudsulfat.demakkab.go.id",
        "use": "work"
      }
    ],
    "address": {
      "use": "work",
      "line": [
        "Jl. Raya Semarang Purwodadi KM. 21 No. 107 Karangawen Demak"
      ],
      "city": "Jawa Tengah",
      "postalCode": "59566",
      "country": "ID",
      "extension": [
        {
          "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
          "extension": [
            {
              "url": "province",
              "valueCode": "33"
            },
            {
              "url": "city",
              "valueCode": "3321"
            },
            {
              "url": "district",
              "valueCode": "332102"
            },
            {
              "url": "village",
              "valueCode": "3321022001"
            },
            {
              "url": "rt",
              "valueCode": "1"
            },
            {
              "url": "rw",
              "valueCode": "2"
            }
          ]
        }
      ]
    },
    "physicalType": {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/location-physical-type",
          "code": "ro",
          "display": "Room"
        }
      ]
    },
    "position": {
      "longitude": -7.043732645807474,
      "latitude": 110.57466438554198,
      "altitude": 0
    },
    "managingOrganization": {
      "reference": "Organization/100025702"
    }
  }



  const getLocation = () => {
    setLoading(true)
    console.log("POST Location", LocationID);

    axios({
      url: "/api/fhir-r4/v1/Location",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt

      },

      // Attaching the form data
      data: DataLocation,

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
        POST Location
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          NAMA LOCATION :
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
      >POST LOCATION </button>
      {Loading === true ? "LOADING..." : (
        <div className="m-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION RESPONSE : {resLocation === "" ? "BELUM ADA LOCATION" : JSON.stringify(resLocation)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION NAME : {resLocation === "" ? "BELUM ADA LOCATION" : (resLocation.name)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            LOCATION ID : {resLocation === "" ? "BELUM ADA LOCATION" : (resLocation.id)}
          </label>
        </div>
      )}
      <div />
    </div>
  )
}



export default PostLocation