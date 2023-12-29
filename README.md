CARA BRIDGING SATU SEHAT

referensi :
https://satusehat.kemkes.go.id/platform/docs/id/playbook/

Endpoint Information
OAuth Base URL

https://api-satusehat.kemkes.go.id/oauth2/v1

Base URL

https://api-satusehat.kemkes.go.id/fhir-r4/v1

Consent URL

https://api-satusehat.dto.kemkes.go.id/consent/v1

WAJIB PUNYA
client_id: <client-id>
client_secret: <client-secret>

1.  GET TOKEN

```
        const dataKirim = {
            client_id: clientID,
            client_secret: clientSecret
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
            })
```

2. GET IHS NUMBER

```
        axios({
            url: "/api/fhir-r4/v1/Patient?identifier=https://fhir.kemkes.go.id/id/nik|" + nik,
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenDt
            },
        })
```

3. GET LOCATION

```
    axios({
      url: "/api/fhir-r4/v1/Location/" + LocationID,
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenDt
      },
    })
      .then((res) => {
        console.log("RESPONSE :", res.data);
      })
```

4. POST LOCATION
   > Parameter Dasar
   > OrganisationID: "100025702"

phoneNo: "024-76602154",
urlWeb : "http://rsudsulfat.demakkab.go.id"
address : "Jl. Raya Semarang Purwodadi KM. 21 No. 107 Karangawen Demak"
city : "Kab Demak"
postalCode: "59566"
kdProvinsi : "33"
kdKota : "3321"
kdkecamatan : "332102"
kdDesa : "3321022001"
NoRT : "1"
NoRW : "2"
longitude : -7.043732645807474,
latitude : 110.57466438554198,
altitude : 0

> Parameter Location
> KodePoli : "RJ002"
> nameLocation : "Ruang Klinik 1"
> descLocation : "Ruang 1, Poliklinik Anak, Lantai 1, Gedung Poliklinik"

```
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
        "value": "RJ002"
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
```

5. GET PRACTIOSIONER

```

```

6. POST PRACTISIONER

```

```

7. POST BUNDLE ENCOUNTER CONDITION OBSERVATION

```

```

8. POST ECOUNTER

```

```

9. POST CONDITION

```

```

10. POST OBSERVATION

```

```
