import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { CommunityService, CommunityPostsService } from '@/services'

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
export const useCommunityStore = defineStore('community', () => {
  const state = reactive({
    communitys: [],
    communitysByAutor: [],
    communitysByName: [],
    selectedCommunity: {},
    communitysPosts: [],
    communitysPostsByAutor: [],
    communitysPostsByCommunity: [],
    selectedCommunityPost: {},
    loading: false,
    error: null,
    connection: false
  })
  const communitys = computed(() => state.communitys)
  const communitysByAutor = computed(() => state.communitysByAutor)
  const communitysByName = computed(() => state.communitysByName)
  const selectedCommunity = computed(() => state.selectedCommunity)

  const communitysPosts = computed(() => state.communitysPosts)
  const communitysPostsByAutor = computed(() => state.communitysPostsByAutor)
  const communitysPostsByCommunity = computed(() => state.communitysPostsByCommunity)
  const selectedCommunityPost = computed(() => state.selectedCommunityPost)

  const CommunityData = reactive({
      name: '',
      description: '',
      autor: null,
      cover: null, 
  })


  /**
   * Fetches organs data.
   * @async
   * @function getSpecies
   */
  const getCommunitys = async (token) => {
    state.loading = true
    try {
      state.communitys = await CommunityService.getCommunitys(token)
      return state.communitys
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPosts = async (token) => {
    state.loading = true
    try {
      state.communitysPosts = await CommunityPostsService.getCommunitysPosts(token)
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
   const getCommunitysByAutor = async (autor,token) => {
    state.loading = true
    try {
      const response = await CommunityService.getCommunitysByAutor(autor,token)  
      state.communitysByAutor = response
      return state.communitysByAutor
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPostsByAutor = async (autor,token) => {
    state.loading = true
    try {
      const response = await CommunityPostsService.getCommunitysPostsByAutor(autor,token)  
      state.communitysPostsByAutor = response
      return state.communitysPostsByAutor
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysByName = async (name,token) => {
    state.loading = true
    try {
      const response = await CommunityService.getCommunitysByName(name,token)  
      state.communitysByName = response
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
      state.connection = true
    }
  }

  const getCommunitysPostsByCommunity = async (community,token) => {
    state.loading = true
    try {
      const response = await CommunityPostsService.getCommunitysPostsByCommunity(community,token)  
      state.communitysPostsByCommunity = response
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
  const createCommunity = async (token) => {
    state.loading = true
    console.log(CommunityData)
    try {
      state.communitys.push(await CommunityService.createCommunity(CommunityData, token))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }
  
  const createCommunityPost = async (newCommunityPost, token) => {
    state.loading = true
    try {
      state.communitysPosts.push(await CommunityPostsService.createCommunityPost(newCommunityPost, token))
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
    communitys,
    communitysByAutor,
    communitysByName,
    selectedCommunity,
    communitysPosts,
    communitysPostsByCommunity,
    communitysPostsByAutor,
    CommunityData,
    getCommunitys,
    getCommunitysByAutor,
    getCommunitysByName,
    createCommunity,
    getCommunitysPosts,
    getCommunitysPostsByAutor,
    getCommunitysPostsByCommunity,
    createCommunityPost
  }
})