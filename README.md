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
        let dataKirim = {
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
                setTokenDt(res.data.access_token)
                setLoading(false)
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

```

4. POST LOCATION

```

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
