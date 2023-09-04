
import {supabaseClient} from "./index"

export async function logIpAddress(ipAddress:string, accessCode: string) {
    let { data, error } = await supabaseClient
        .rpc('checkipaddress', {
            code: accessCode,
            ipaddr:ipAddress
        })
    if (error) {
        console.log(error)
        return false;
    }else{
        return data;
    }
}