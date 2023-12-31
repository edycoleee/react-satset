import React, { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { OrganisationID } from '../util';

function Bundle() {
  const { tokenDt, OrgId } = useContext(SatsetContext);
  const [Loading, setLoading] = useState(false)
  const [resBundle, setResBundle] = useState("")
  const [dtSend, setDtSend] = useState({
    NamaPasien: "PUTRI APRILIA NAFIKA",
    NoIHS: "P00590441751",
    NoRegister: "RG2023I0000175",
    TglJam: "2023-12-27T05:57:41-07:00",
    DiagUtama: "K35.8",
    NamaDiagUtama: "Acute appendicitis, other and unspecified",
    Temp: 36,
    PractisionerIHS: "10016869420",
    PractiosionerDisplay: "Dokter Spesialis Anak",
    LocationID: "ecff1c64-3f62-4469-b577-ea38f263b276",
    LocationDisplay: "Ruang 1, Poliklinik Anak, Lantai 1, Gedung Poliklinik",
  })

  const handleChange = (e) => {
    setDtSend((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const uuidEncounter = uuidv4()
  const uuidCondition = uuidv4()
  const uuidObservation = uuidv4()

  const DATABUNDLE = {
    "resourceType": "Bundle",
    "type": "transaction",
    "entry": [
      {
        "fullUrl": "urn:uuid:" + uuidEncounter,
        "resource": {
          "resourceType": "Encounter",
          "status": "finished",
          "class": {
            "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            "code": "AMB",
            "display": "ambulatory"
          },
          "subject": {
            "reference": "Patient/" + dtSend.NoIHS,
            "display": dtSend.NamaPasien
          },
          "participant": [
            {
              "type": [
                {
                  "coding": [
                    {
                      "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                      "code": "ATND",
                      "display": "attender"
                    }
                  ]
                }
              ],
              "individual": {
                "reference": "Practitioner/" + dtSend.PractisionerIHS,
                "display": dtSend.PractiosionerDisplay
              }
            }
          ],
          "period": {
            "start": dtSend.TglJam,
            "end": dtSend.TglJam
          },
          "location": [
            {
              "location": {
                "reference": "Location/" + dtSend.LocationID,
                "display": dtSend.LocationDisplay
              }
            }
          ],

          "statusHistory": [
            {
              "status": "arrived",
              "period": {
                "start": dtSend.TglJam,
                "end": dtSend.TglJam
              }
            },
            {
              "status": "in-progress",
              "period": {
                "start": dtSend.TglJam,
                "end": dtSend.TglJam
              }
            },
            {
              "status": "finished",
              "period": {
                "start": dtSend.TglJam,
                "end": dtSend.TglJam
              }
            }
          ],
          "serviceProvider": {
            "reference": "Organization/" + OrgId
          },
          "identifier": [
            {
              "system": "http://sys-ids.kemkes.go.id/encounter/" + OrgId,
              "value": dtSend.NoRegister
            }
          ]
        },
        "request": {
          "method": "POST",
          "url": "Encounter"
        }
      },
      {
        "fullUrl": "urn:uuid:" + uuidCondition,
        "resource": {
          "resourceType": "Condition",
          "clinicalStatus": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                "code": "active",
                "display": "Active"
              }
            ]
          },
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                  "code": "encounter-diagnosis",
                  "display": "Encounter Diagnosis"
                }
              ]
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/icd-10",
                "code": dtSend.DiagUtama,
                "display": dtSend.NamaDiagUtama
              }
            ]
          },
          "subject": {
            "reference": "Patient/" + dtSend.NoIHS,
            "display": dtSend.NamaPasien
          },
          "encounter": {
            "reference": "urn:uuid:" + uuidEncounter,
            "display": "Kunjungan " + dtSend.NamaPasien + " di " + dtSend.TglJam
          }
        },
        "request": {
          "method": "POST",
          "url": "Condition"
        }
      },
      {
        "fullUrl": "urn:uuid:" + uuidObservation,
        "resource": {
          "resourceType": "Observation",
          "status": "final",
          "category": [
            {
              "coding": [
                {
                  "system": "http://terminology.hl7.org/CodeSystem/observation-category",
                  "code": "vital-signs",
                  "display": "Vital Signs"
                }
              ]
            }
          ],
          "code": {
            "coding": [
              {
                "system": "http://loinc.org",
                "code": "8310-5",
                "display": "Body temperature"
              }
            ]
          },
          "subject": {
            "reference": "Patient/" + dtSend.NoIHS
          },
          "performer": [
            {
              "reference": "Practitioner/" + dtSend.PractisionerIHS,
            }
          ],
          "encounter": {
            "reference": "urn:uuid:" + uuidEncounter,
            "display": "Kunjungan " + dtSend.NamaPasien + " di " + dtSend.TglJam
          },
          "effectiveDateTime": dtSend.TglJam,
          "valueQuantity": {
            "value": dtSend.Temp,
            "unit": "C",
            "system": "http://unitsofmeasure.org",
            "code": "Cel"
          },
        },
        "request": {
          "method": "POST",
          "url": "Observation"
        }
      }
    ]
  }

  const postBundle = () => {
    setLoading(true)
    console.log("POST Bundle", DATABUNDLE);

    axios({
      url: "/api/fhir-r4/v1",
      method: "POST",
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt
      },
      data: DATABUNDLE,
    })
      .then((res) => {
        console.log("RESPONSE :", res.data);
        setResBundle(res.data)
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
        POST BUNDLE
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PractisionerIHS">
          PractisionerIHS :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="PractisionerIHS"
          type="text"
          name="PractisionerIHS"
          value={dtSend.PractisionerIHS}
          onChange={handleChange}
        />

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PractiosionerDisplay">
          PractiosionerDisplay :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="PractiosionerDisplay"
          type="text"
          name="PractiosionerDisplay"
          value={dtSend.PractiosionerDisplay}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LocationID">
          LocationID :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="LocationID"
          type="text"
          name="LocationID"
          value={dtSend.LocationID}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="LocationDisplay">
          LocationDisplay :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="LocationDisplay"
          type="text"
          name="LocationDisplay"
          value={dtSend.LocationDisplay}
          onChange={handleChange}
        />
      </div>
      <div className="m-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NamaPasien">
          NAMA :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="NamaPasien"
          type="text"
          name="NamaPasien"
          value={dtSend.NamaPasien}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NoIHS">
          NoIHS :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="NoIHS"
          type="text"
          name="NoIHS"
          value={dtSend.NoIHS}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NoRegister">
          NoRegister :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="NoRegister"
          type="text"
          name="NoRegister"
          value={dtSend.NoRegister}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TglJam">
          TglJam :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="TglJam"
          type="text"
          name="TglJam"
          value={dtSend.TglJam}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DiagUtama">
          DiagUtama :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="DiagUtama"
          type="text"
          name="DiagUtama"
          value={dtSend.DiagUtama}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NamaDiagUtama">
          NamaDiagUtama :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="NamaDiagUtama"
          type="text"
          name="NamaDiagUtama"
          value={dtSend.NamaDiagUtama}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Temp">
          Temperature :
        </label>
        <input
          className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Temp"
          type="number"
          name="Temp"
          value={dtSend.Temp}
          onChange={handleChange}
        />
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
        onClick={() => postBundle()}
      >POST BUNDLE </button>
      {Loading === true ? "LOADING..." : (
        <div className="m-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            BUNDLE RESPONSE : {resBundle === "" ? "BELUM ADA RESPONSE" : JSON.stringify(resBundle)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            RESOURCE ID ENCOUNTER : {resBundle === "" ? "BELUM ADA RESPONSE" : JSON.stringify(resBundle.entry[0]?.response.resourceID)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            RESOURCE ID CONDITION : {resBundle === "" ? "BELUM ADA RESPONSE" : JSON.stringify(resBundle.entry[1]?.response.resourceID)}
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            RESOURCE ID OBSERVATION : {resBundle === "" ? "BELUM ADA RESPONSE" : JSON.stringify(resBundle.entry[2]?.response.resourceID)}
          </label>
        </div>
      )}
      <div />
    </div>
  )
}

export default Bundle