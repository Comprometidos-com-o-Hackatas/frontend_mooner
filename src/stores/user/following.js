import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { FollowingService } from '@/services'

/**
 * Store for managing organs data.
 * @typedef {Object} SpecieStore
 * @property {Object} state - The state object containing organs data.
 * @property {Array} state.species - The array of organs.
 * @property {Object|null} state.selectedSpecie - The currently selected organ.
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
export const useFollowingStore = defineStore('following', () => {
  const state = reactive({
    followers: [],
    selectedFollower: {},
    followerByUser: [],
    followerByArtist: [],
    loading: false,
    error: null,
    connection: false
  })
  const followers = computed(() => state.followers)
  const followersByArtist = computed(() => state.followerByArtist)
  const followersByUser = computed(() => state.followerByUser)
  const selectedFollower = computed(()=> state.selectedFollower)
  const isLoading = computed(() => state.loading)


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getFollowers = async (token) => {
    state.loading = true
    try {
      state.followers = await FollowingService.getFollowings(token)
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
   const getFollowingByUser = async (user,token) => {
    state.loading = true
    try {
      const response = await FollowingService.getFollowingsByUser(user,token)  
      state.followerByUser = response
      return state.followerByUser
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getFollowingByArtist = async (artist,token) => {
    state.loading = true
    try {
      const response = await FollowingService.getFollowingsByArtist(artist,token)  
      state.followerByArtist = response
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
  const createFollow = async (newFollower, token) => {
    state.loading = true
    try {
      state.followers.push(await FollowingService.createFollowing(newFollower, token))
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


  return {
    state,
    isLoading,
    followers,
    followersByArtist,
    followersByUser,
    selectedFollower,
    getFollowers,
    getFollowingByArtist,
    getFollowingByUser,
    createFollow,
  }
})