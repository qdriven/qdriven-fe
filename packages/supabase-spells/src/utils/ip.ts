import axios from "axios";
const JSON_IP_URL = "https://jsonip.com";

async function getClientIpAddress():Promise<string>{
    let response = await axios.get(JSON_IP_URL);
    let ipAddress = response.data.ip
    return ipAddress;
}

export {getClientIpAddress}