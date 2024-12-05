import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { PlaylistService } from '@/services'
import { useStorage } from '@vueuse/core'

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

  const state = useStorage('playlistStorage', {
    playlists: [],
    selectedPlaylist: {},
    playlistsBySong: [],
    playlistsByOwner: [],
    loading: false,
    error: null,
    connection: false,
  })

  const attach = ref(null)
  const playlists = computed(() => state.value.playlists)
  const playlistsBySong = computed(() => state.value.playlistsBySong)
  const selectedPlaylist = computed(()=> state.value.selectedPlaylist)
  const isLoading = computed(() => state.value.loading)
  const playlistsCount = computed(() => state.value.playlists.length)
  const playlistsByOwner = computed(() => state.value.playlistsByOwner)

  const newPlaylist = reactive({
    id: state.value.selectedPlaylist.id,
    name: state.value.selectedPlaylist.name,
    owners: [],
    cover: null,
    songs: []
  })

  const showNewPlaylist = computed(()=> newPlaylist)
  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getPlaylist = async (token) => {
    state.value.loading = true
    try {
      state.value.playlists = await PlaylistService.getPlaylist(token)
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

   /**
   * Fetches organs data.
   * @async
   * @function getOrgansBySystem
   */
   const getPlaylistBySongs = async (songs,token) => {
    state.value.loading = true
    try {
      const response = await PlaylistService.getPlaylistsBySongs(songs, token)
      state.value.playlistsBySong = response
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  const getPlaylistsByOwner = async (owner,token) => {
    state.value.loading = true
    try {
      const response = await PlaylistService.getPlaylistsByOwner(owner, token)
      state.value.playlistsByOwner = response
      return state.value.playlistsByOwner
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
      state.value.connection = true
    }
  }

  /**
   * Creates a new organ.
   * @async
   * @function createSpecie
   * @param {Object} newSpecie - The new organ object to create.
   */
  const createPlaylist = async (newPlaylist, token) => {
    state.value.loading = true
  
    try {
      state.value.playlists.push(await PlaylistService.createPlaylist(newPlaylist, token))
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
  }

  /**
   * Updates an existing organ.
   * @async
   * @function updateSpecie
   * @param {Object} specie - The organ object to update.
   */
  const updatePlaylist = async (playlist, token) => {
    state.value.loading = true
    try {
      await PlaylistService.updatePlaylist(playlist, token)
    } catch (error) {
      state.value.error = error
      console.log(error)
    } finally {
      state.value.loading = false
    }
  }
  /**
   * Deletes a organ.
   * @async
   * @function deleteSpecie
   * @param {number} id - The ID of the organ to delete.
   */
  const deleteOrgan = async (id) => {
    state.value.loading = true
    try {
      const index = state.value.organs.findIndex((s) => s.id === id)
      state.value.organs.splice(index, 1)
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
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
    attach,
    newPlaylist,
    showNewPlaylist,
    getPlaylist,
    getPlaylistBySongs,
    getPlaylistsByOwner,
    createPlaylist,
    updatePlaylist,
    deleteOrgan
  }
})