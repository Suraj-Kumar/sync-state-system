# Computer Endpoints

## Create Computer
```text
POST /v1/computers
Request body 
{
    "name":"computer 2",
    "ip": "127.0.0.2",
    "groupId":1
    
}
Response 201 
{
        "id": 4,
        "name": "computer 1",
        "ip": "127.0.0.1",
        "groupId": 1,
        "createdAt": "2021-09-12T11:35:57.000Z",
        "updatedAt": "2021-09-12T11:35:57.000Z"
}
```
## Get Computer 
```text
GET v1/computers/{id}
response 200
    {
        "id": 4,
        "name": "computer 1",
        "ip": "127.0.0.1",
        "groupId": 1,
        "createdAt": "2021-09-12T11:35:57.000Z",
        "updatedAt": "2021-09-12T11:35:57.000Z"
    }
```
## Update Computer
```text
PUT v1/computers/{id}
request body 
{
    "name": "computer 201"
}
response 204
```
## Delete computer 
```text
DELETE v1/computers/{id}
response 204
```

# Policy Endpoints
## Create Policy 
```text
POST /v1/policies
{
    "computerName": "computer 2002",
    "allowedIp" :"127.0.0.1",
    "type":"computer_policy"
}
Response 201
{
    "id": 7,
    "computerName": "computer 200365",
    "allowedIp": "127.0.0.133",
    "type": "computer_policy",
    "updatedAt": "2021-09-13T22:06:56.250Z",
    "createdAt": "2021-09-13T22:06:56.250Z"
}
```
## GET Policy 
```text
GET /v1/policies/{id}
Response 200
{
    "id": 7,
    "computerName": "computer 200365",
    "allowedIp": "127.0.0.133",
    "type": "computer_policy",
    "createdAt": "2021-09-13T22:06:56.000Z",
    "updatedAt": "2021-09-13T22:06:56.000Z"
}
```
## Update Policy 
```text
PUT /v1/policies/{id}
{"computerName":"computer -updated-1","allowedIp":"127.0.0.1","type":"computer_policy"}
Response 204 
```

## Delete Policy 
```text
DELETE /v1/policies/{id}
Response 204 
```

# Get sync status
```text
GET v1/computers/syn-status
Response 200
[
    {
        "computerGroup": "my test group",
        "syncedComputers": 3,
        "totalComuters": 3,
        "syncedPercentage": 100,
        "computers": [
            {
                "id": 1,
                "name": "computer-1",
                "policyId": 1
            },
            {
                "id": 3,
                "name": "computer-3",
                "policyId": 3
            },
            {
                "id": 4,
                "name": "computer-4",
                "policyId": 4
            }
        ],
        "errors": []
    },
    {
        "computerGroup": "Group 1",
        "syncedComputers": 2,
        "totalComuters": 3,
        "syncedPercentage": 66.66666666666666,
        "computers": [
            {
                "id": 2,
                "name": "computer-2",
                "policyId": 2
            },
            {
                "id": 5,
                "name": "computer-5",
                "policyId": 5
            },
            {
                "id": 6,
                "name": "computer -updated-6050",
                "policyId": 6
            }
        ],
        "errors": [
            {
                "computerId": 6,
                "error": "{\"status\":500,\"code\":\"INTERNAL_SERVER_ERROR\",\"message\":\"Something went wrong\"}"
            }
        ]
    }
]
```