import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import clientReducer from '../features/clients/clientSlice'
import reservationReducer from '../features/reservations/reservationSlice'
import stylistReducer from '../features/stylists/stylistSlice'
import serviceReducer from '../features/services/serviceSlice'
import adminReducer from "../features/admins/adminSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        client: clientReducer,
        stylist: stylistReducer,
        service: serviceReducer,
        reservation: reservationReducer,
        admin: adminReducer
    }
})