import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { PlaylistService } from '@/services'

/**
 * Store for managing organs data.
 * @typedef {Object} SpecieStore
 * @property {Object} state - The state object containing organs data.
 * @property {Array} state.species - The array of organs.
 * @property {Object|null} state.selectedSpecie - The lalalala currently selected organ.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} speciesCount - Computed property indicating the number of organs.
 * @property {Function} getSpecies - Function to fetch organs data.
 * @property {Function} createSpecie - Function to create a new specie.
 * @property {Function} updateSpecie - Function to update an existing organ.
 * @property {Function} deleteSpecie - Function to delete a organ.
 */

/**
 * Creates a new instance of the OrganStore.
 * @function useSpecieStore
 * @returns {SpecieStore} The OrganStore instance.
 */
export const usePlaylistStore = defineStore('playlist', () => {
  const state = reactive({
    playlists: [],
    selectedPlaylist: {},
    playlistsBySong: [],
    playlistsByOwner: [],
    loading: false,
    error: null,
    connection: false
  })
  const playlists = computed(() => state.playlists)
  const playlistsBySong = computed(() => state.playlistsBySong)
  const selectedPlaylist = computed(()=> state.selectedPlaylist)
  const isLoading = computed(() => state.loading)
  const playlistsCount = computed(() => state.playlists.length)
  const playlistsByOwner = computed(() => state.playlistsByOwner)

  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getPlaylist = async (token) => {
    state.loading = true
    try {
      state.playlists = await PlaylistService.getPlaylist(token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

   /**
   * Fetches organs data.
   * @async
   * @function getOrgansBySystem
   */
   const getPlaylistBySongs = async (songs,token) => {
    state.loading = true
    try {
      const response = await PlaylistService.getPlaylistsBySongs(songs, token)
      state.playlistsBySong = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getPlaylistsByOwner = async (owner,token) => {
    state.loading = true
    try {
      const response = await PlaylistService.getPlaylistsByOwner(owner, token)
      console.log(response)
      state.playlistsByOwner = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createPlaylist = async (newPlaylist, token) => {
    state.loading = true
    console.log(newPlaylist)
    try {
      state.playlists.push(await PlaylistService.createPlaylist(newPlaylist, token))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  /**
   * Updates an existing organ.
   * @async
   * @function updateSpecie
   * @param {Object} specie - The organ object to update.
   */
  const updatePlaylist = async (playlist, token) => {
    state.loading = true
    try {
      const index = state.songs.findIndex((s) => s.id === playlist.id)
      state.playlists[index] = await PlaylistService.updatePlaylist(playlist, token)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  /**
   * Deletes a organ.
   * @async
   * @function deleteSpecie
   * @param {number} id - The ID of the organ to delete.
   */
  const deleteOrgan = async (id) => {
    state.loading = true
    try {
      const index = state.organs.findIndex((s) => s.id === id)
      state.organs.splice(index, 1)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    playlistsCount,
    playlists,
    playlistsBySong,
    selectedPlaylist,
    playlistsByOwner,
    getPlaylist,
    getPlaylistBySongs,
    getPlaylistsByOwner,
    createPlaylist,
    updatePlaylist,
    deleteOrgan
  }
})