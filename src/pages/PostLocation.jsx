import React, { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';
import { OrganisationID } from '../util';

function PostLocation() {
  const { tokenDt } = useContext(SatsetContext);
  const [Loading, setLoading] = useState(false)
  const [resLocation, setResLocation] = useState("")
  const [kdLocation, setKdLocation] = useState("RJ002")
  const [nameLocation, setNameLocation] = useState("Ruang Klinik 1")
  const [descLocation, setDescLocation] = useState("Ruang 1, Poliklinik Anak, Lantai 1, Gedung Poliklinik")
  const [LocationID, setLocationID] = useState("")

  const LocData = {
    phoneNo: "024-76602154",
    urlWeb: "http://rsudsulfat.demakkab.go.id",
    address: "Jl. Raya Semarang Purwodadi KM. 21 No. 107 Karangawen Demak",
    city: "Kab Demak",
    postalCode: "59566",
    kdProvinsi: "33",
    kdKota: "3321",
    kdkecamatan: "332102",
    kdDesa: "3321022001",
    NoRT: "1",
    NoRW: "2",
    longitude: -7.043732645807474,
    latitude: 110.57466438554198,
    altitude: 0,
  }

  const DataLocation = {
    "resourceType": "Location",
    "identifier": [
      {
        "system": "http://sys-ids.kemkes.go.id/location/" + OrganisationID,
        "value": kdLocation
      }
    ],
    "status": "active",
    "name": nameLocation,
    "description": descLocation,
    "mode": "instance",
    "telecom": [
      {
        "system": "phone",
        "value": LocData.phoneNo,
        "use": "work"
      },
      {
        "system": "url",
        "value": LocData.urlWeb,
        "use": "work"
      }
    ],
    "address": {
      "use": "work",
      "line": [
        LocData.address
      ],
      "city": LocData.city,
      "postalCode": LocData.postalCode,
      "country": "ID",
      "extension": [
        {
          "url": "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
          "extension": [
            {
              "url": "province",
              "valueCode": LocData.kdProvinsi
            },
            {
              "url": "city",
              "valueCode": LocData.kdKota
            },
            {
              "url": "district",
              "valueCode": LocData.kdkecamatan
            },
            {
              "url": "village",
              "valueCode": LocData.kdDesa
            },
            {
              "url": "rt",
              "valueCode": LocData.NoRT
            },
            {
              "url": "rw",
              "valueCode": LocData.NoRW
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
      "longitude": LocData.longitude,
      "latitude": LocData.latitude,
      "altitude": LocData.altitude
    },
    "managingOrganization": {
      "reference": "Organization/" + OrganisationID
    }
  }



  const getLocation = () => {
    setLoading(true)
    console.log("POST Location");

    axios({
      url: "/api/fhir-r4/v1/Location",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt
      },
      data: DataLocation,
    })
      .then((res) => {
        console.log("RESPONSE :", res.data);
        setResLocation(res.data)
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
        POST Location
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          KODE LOCATION :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={kdLocation}
          onChange={(e) => setKdLocation(e.target.value)}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          NAMA LOCATION :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={nameLocation}
          onChange={(e) => setNameLocation(e.target.value)}
        />
        <label className="block text-gray-700 text-sm font-bold mt-2" htmlFor="username">
          DESKRIPSI LOCATION :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={descLocation}
          onChange={(e) => setDescLocation(e.target.value)}
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