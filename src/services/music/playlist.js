import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class PlaylistService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getPlaylist(token) {
        try {
            const { data } = await api.get('/playlists', {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: GetPlaylist - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetPlaylist - return error", error);
            throw error;
        }
    }

    async getPlaylistsBySongs(songs, token) {
        try {
            const {data} = await api.get(`/playlists/?song_id=${songs}`, {headers: {'authorization': `Bearer ${token}`}});
        return data.results
        } catch (error) {
            console.log('Error in getPlaylistsBySongs', error);
            throw error;
        }
    }

    async getPlaylistsByOwner(owner, token) {
        try {
            
            const {data} = await api.get(`/playlists/?owners_email=${owner}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log(data.results)
        return data.results
        } catch (error) {
            console.log('Error in getPlaylistsBySongs', error);
            throw error;
        }
    }
    
    // async getPlaylistsByName(song, token) {
    //     try {
    //         const {data} = await api.get(`/playlists/?name=${song}`, {headers: {'authorization': `Bearer ${token}`}});
    //     return data.results
    //     } catch (error) {
    //         console.log('Error in getPlaylistsBySongs', error);
    //         throw error;
    //     }
    // }


    

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createPlaylist(newPlaylist, token) {
        try {
            console.log(newPlaylist)
            const { data } = await api.post('/playlists/', newPlaylist, {headers: {'authorization': `Bearer ${token}`}});
            console.log(data)
            console.log( "Service: AddPlaylist - return success")
            return data.results;
        } catch (error) {
            console.log("Service: AddPlaylist - return error", error);
            throw error;
        }
    }

    /**
     * Updates an existing slide
     * @param {Object} slide - The updated slide to be saved
     * @param {Object} id - The slide id to be saved
     * @returns {Promise<Object>} A promise that resolves to the updated slides Object
     * @throws {Error} If an error occurs while updating the slide
     */
    async updatePlaylist(playlist, token) {
        try {
            const { data } = await api.put(`/playlists/${playlist.id}/`, song, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: UpdateSong - return success")
            return data.results;
        } catch (error) {
            console.log("Service: UpdateSong - return error", error);
            throw error;
        }
    }

    /**
     * Delete an exiting slide
     * @param {number} idSlide - The Id of the slide to be deleted
     * @returns {Promise<Object>} A promise that resolves to the deleted slide object.
     * @throws {Error} If an error occurs while deleting the slide
     */
    async deletesong(idPost) {
        try {
            const { data } = await api.delete(`/song/${idPost}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: DeletePost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: DeletePost - return error", error);
            throw error;
        }
    }
}

export default new PlaylistService();