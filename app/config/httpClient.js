const axios = require("axios");
const axiosRetry = require('axios-retry');
axiosRetry(axios, { retries: 3, retryCondition: (error)=>true})

const baseUrl = "http://localhost:8080";

const createThirdPartyComputerPolicy = (computerPolicy,metadata) =>{
    console.log("updating computer policy for computer :", computerPolicy.computerName);
    let url = `${baseUrl}/v1/policies`;
        return axios.post(url,computerPolicy,{'axios-retry': {
            retries: 3
          }}).then((response=>{
            return {
                status : response.status,
                metadata,
                thirdPartyResponse: response.data }
          })).catch(e=>{
            console.log("request failed");
            throw {metadata, error: e.response.data};
        })
}

const updateThirdPartyComputerPolicy = (computerPolicy,metadata) =>{
    const {computer} = metadata;
    console.log("updating computer policy for computer :", computerPolicy.computerName);
    let url = `${baseUrl}/v1/policies/${computer.policy?.id}`;
    return Promise.resolve(
        axios.put(url,computerPolicy,{'axios-retry': {
            retries: 3
          }}).then(response=>{
            return {
                status : response.status,
                metadata,
                thirdPartyResponse: response.data
            }
        }).catch(e=>{
            console.log("request failed");
            throw {metadata, error: e.response.data};
        })
    )
}

const deleteThirdPartyComputerPolicy = (computerPolicy, metadata) =>{
    const {computer} = metadata;
    console.log("deleting computer policy for computer :", computerPolicy.computerName);
    let url = `${baseUrl}/v1/policies/${computer.policy?.id}`;
    return Promise.resolve(
        axios.delete(url,{'axios-retry': {
            retries: 3
          }}).then(response=>{
           return {
            status : response.status,
            metadata,
            thirdPartyResponse: response.data
        }
        }).catch(e=>{
            console.log("request failed");
            throw {metadata, error: e.response.data};
        })
    )
}





module.exports ={createThirdPartyComputerPolicy, updateThirdPartyComputerPolicy, deleteThirdPartyComputerPolicy}