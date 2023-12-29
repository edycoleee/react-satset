import { useContext, useState } from 'react'
import { SatsetContext } from './Context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import * as XLSX from 'xlsx'

function Bundles() {
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
  const [resAll, setResAll] = useState([])
  const OrganisationID = OrgId
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects
  // handle File
  const fileType = ['application/vnd.ms-excel'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    console.log("1", selectedFile);

    if (selectedFile) {
      //console.log(selectedFile.type);
      //if (selectedFile && fileType.includes(selectedFile.type)) {
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        //console.log("2", reader);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit = () => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      //const workbook = XLSX.read(excelFile, { type: 'binary', cellDates: true, Date: 'yyyy/mm/dd;@' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log(data);
    }
    else {
      setExcelData(null);
      console.log("ternyata Null");
    }
  }

  const [stLoading, setStLoading] = useState(false);
  let responseAll = []

  async function onUploudData() {
    responseAll = []
    console.log("Uploud Data");
    if (excelData.length === 0) return console.log("DataKosong");
    if (excelData[0]?.id !== undefined) return console.log("Data Lama");
    setStLoading(true);
    const saveloop = async () => {
      for await (const item of excelData) {
        console.log(item);
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
                  "reference": "Patient/" + item.NoIHS,
                  "display": item.NamaPasien
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
                  "start": item.TglJam,
                  "end": item.TglJam
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
                      "start": item.TglJam,
                      "end": item.TglJam
                    }
                  },
                  {
                    "status": "in-progress",
                    "period": {
                      "start": item.TglJam,
                      "end": item.TglJam
                    }
                  },
                  {
                    "status": "finished",
                    "period": {
                      "start": item.TglJam,
                      "end": item.TglJam
                    }
                  }
                ],
                "serviceProvider": {
                  "reference": "Organization/" + OrganisationID
                },
                "identifier": [
                  {
                    "system": "http://sys-ids.kemkes.go.id/encounter/" + OrganisationID,
                    "value": item.NoRegister
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
                      "code": item.DiagUtama,
                      "display": item.NamaDiagUtama
                    }
                  ]
                },
                "subject": {
                  "reference": "Patient/" + item.NoIHS,
                  "display": item.NamaPasien
                },
                "encounter": {
                  "reference": "urn:uuid:" + uuidEncounter,
                  "display": "Kunjungan " + item.NamaPasien + " di " + item.TglJam
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
                  "reference": "Patient/" + item.NoIHS
                },
                "performer": [
                  {
                    "reference": "Practitioner/" + dtSend.PractisionerIHS,
                  }
                ],
                "encounter": {
                  "reference": "urn:uuid:" + uuidEncounter,
                  "display": "Kunjungan " + item.NamaPasien + " di " + item.TglJam
                },
                "effectiveDateTime": item.TglJam,
                "valueQuantity": {
                  "value": parseInt(item.Temp),
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
        console.log(DATABUNDLE);
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
            responseAll.push({
              ...res.data
            });
            setLoading(false)
          })
          .catch((err) => {
            console.log("ERROR :", err);
            setLoading(false)
          });
      }
    };
    await saveloop().then(() => setStLoading(false));

  }


  const handleChange = (e) => {
    setDtSend((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
        POST BUNDLE PER 10 PASIEN
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
          onChange={() => handleChange()}
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
          onChange={() => handleChange()}
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
          onChange={() => handleChange()}
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
          onChange={() => handleChange()}
        />
      </div>
      <div className="m-4">
        <a href="https://docs.google.com/spreadsheets/d/1WVxYjwDNiJkvBFu0cEf6npSu5P_i48UO/edit?usp=sharing&ouid=102889688937325419052&rtpof=true&sd=true" className="text-blue-400">CONTOH FILE EXCEL</a>
        <p />
        UPLOUD EXCEL <p />
        <input type='file' className='form-control'
          onChange={(e) => handleFile(e)} required></input>
        {excelFileError && <div className='text-danger'
          style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled' onClick={() => handleSubmit()}
          style={{ marginTop: 5 + 'px' }}>UPLOUD</button>
        <h5>View Excel file</h5>
        <div className='viewer'>
          {excelData === null && <>No file selected</>}
          {excelData !== null && (
            <div className='table-responsive'>
              <table className="min-w-full text-left text-sm font-light">
                <thead>
                  <tr>
                    <th scope='col'>NamaPasien</th>
                    <th scope='col'>NoIHS</th>
                    <th scope='col'>NoRegister</th>
                    <th scope='col'>TglJam</th>
                    <th scope='col'>DiagUtama</th>
                    <th scope='col'>NamaDiagUtama</th>
                    <th scope='col'>Temp</th>
                  </tr>
                </thead>
                <tbody>
                  <Data excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>




      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled'
        onClick={() => onUploudData()}
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            RESPONSE ALL : {JSON.stringify(responseAll)}
          </label>
        </div>
      )}
      <div />

    </div>
  )
}

const Data = ({ excelData }) => {
  return excelData.map((individualExcelData) => (
    <tr key={individualExcelData.NoRegister}>
      <IndividualData individualExcelData={individualExcelData} />
    </tr>
  ))
}

const IndividualData = ({ individualExcelData }) => {
  return (
    <>
      <th>{individualExcelData.NamaPasien}</th>
      <th>{individualExcelData.NoIHS}</th>
      <th>{individualExcelData.NoRegister}</th>
      <th>{individualExcelData.TglJam}</th>
      <th>{individualExcelData.DiagUtama}</th>
      <th>{individualExcelData.NamaDiagUtama}</th>
      <th>{individualExcelData.Temp}</th>
      {/* <th>{individualExcelData.Date}</th> */}
    </>
  )
}

export default Bundles