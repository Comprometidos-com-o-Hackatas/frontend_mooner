import { useStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { plans } from "@/utils/plans/plans"
import { ref, reactive } from "vue"
import { PaymentMethodService } from "@/services"

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

export const usePaymentStore = defineStore('payment', ()=>{
    const typeAssign = useStorage('assign', {
        assign: {}
    })

    const state = reactive({
        loading: false,
        error: null,
        connection: false
      })
    const msg = ref(null)
    const err = ref(false)
    
    const getAssign = (name) => {
        const findassign = plans.find(assign => assign.name === name)
        typeAssign.value.assign = findassign
    }

    const createPayment = async (payload, token, email) => {
        state.loading = true
        try{
            const response = await PaymentMethodService.CreatePayment(payload, token,email)
            if(response.status === 200){
                msg.value = response.data.msg
                err.value = false
            }
        }
        catch(error){
            state.error = error
        }
        finally{
            state.loading = false
            state.connection = true
        }
        
    }

    const getQRcode  = async (email) =>{
        const response = await PaymentMethodService.GetQrCode(email)
        return response
    }

    const GetPaymentStatus =  async (email) =>{
        const response = await PaymentMethodService.GetStatusPayment(email)
        return response
    }
    
    return { typeAssign, getAssign, GetPaymentStatus, createPayment, getQRcode, err, msg }
})