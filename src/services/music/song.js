import api from "@/plugins/api";

/**
 * Service class for handling slides related options
 */
class SongService {

    /**
     * Retrieves all slides
     * @returns {Promise<Array>} A promise that resolves to an array of slides
     * @throws {Error} If an error occurs while retrieving the slides
     */
    async getSong(token) {
        try {
            const { data } = await api.get('/songs');
            console.log( "Service: GetSong - return success")
            return data.results;
        } catch (error) {
            console.log("Service: GetSong - return error", error);
            throw error;
        }
    }

    async getSongByTitle(name, token) {
        try {
            const {data} = await api.get(`/songs/?search=${name}`);
        return data.results
        } catch (error) {
            console.log('Error in getSongByTitle', error);
            throw error;
        }
    }

    async getSongByGenre(genre, token){
        try {
            const { data } = await api.get(`/songs/?search=${genre}`);
            console.log( "Service: AddSong - return success")
            return data.results;
        } catch (error) {
            console.log("Service: AddSong - return error", error);
            throw error;
        }
    }

    /**
     * Creates a new Slide
     * @param {Object} newSlide - The new slide to be created 
     * @returns {Promise<Object>} A promise that resolves to the created slides Object
     * @throws {Error} If an error occurs while creating the slide
     */
    async createSong(newSong, token) {
        try {
            const { data } = await api.post('songs/', newSong, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: AddSong - return success")
            return data
        } catch (error) {
            console.log("Service: AddSong - return error", error);
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
    async updatesong(song, token) {
        try {
            const { data } = await api.put(`/songs/${song.id}/`, song, {headers: {'authorization': `Bearer ${token}`}});
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
    async deletesong(idPost, token) {
        try {
            const { data } = await api.delete(`/songs/${idPost}`, {headers: {'authorization': `Bearer ${token}`}});
            console.log( "Service: DeletePost - return success")
            return data.results;
        } catch (error) {
            console.log("Service: DeletePost - return error", error);
            throw error;
        }
    }
}

export default new SongService();