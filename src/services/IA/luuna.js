import api from "@/plugins/api";

export default class LunnaIAService{
    
    async LuunaCreateResponse(answer, token) {
        try {
            const response = await api.post('/luna/', answer, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.status;
        } catch (error) {
            console.error("Error in createResponse:", error);
            throw error;
        }
    }

    async GetLunnaChat(user, token, page = 1) {
        try {
            const { data } = await api.get('/luna/', {
                params: { page, usuario: user },
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        } catch (error) {
            console.error("Error in getLuunaChat:", error);
            throw error;
        }
    }
}