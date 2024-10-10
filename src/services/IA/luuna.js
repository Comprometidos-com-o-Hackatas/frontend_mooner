import api from "@/plugins/api";

export default class LunnaIAService{
    
    async LuunaCreateResponse(awswer, token){
        const response =  await api.post('luna/', awswer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.status
    }
    async GetLunnaChat(user, token, page){
        const {data} = await api.get(`luna/?page=${page}&usuario=${user}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return data
    }
}