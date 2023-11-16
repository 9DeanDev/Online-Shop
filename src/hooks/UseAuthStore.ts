import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { axiosClient } from '../configs/axiosClient'

// export interface AuthState {
//   // loading: boolean;
//   loggedInUser: any;
//   access_token: string;
//   login: () => void
//   logout: () => void
// }

const useAuthStore = create(
  persist(
    devtools(
      (set) => ({
        // loading: false,
        loggedInUser: null,
        access_token: null,
        login: async (username: string, password: string) => {
          try {
            // set((state: any) => ({ loading: false }), false, { type: 'auth/loading', payload: {} })
            const response = await axiosClient.post('/auth/login', { username, password })
            set((state: any) => ({ loggedInUser: response.data.loggedInUser, access_token: response.data.access_token }),
              false, { type: 'auth/Login', payload: { loggedInUser: response.data.loggedInUser, access_token: response.data.access_token } })
          }
          catch (error) {
            console.log('>>>>>>>', error)
            alert('Tài khoản hoặc mật khẩu không đúng')
          }
        }
        ,
        logout: () => set((state: any) => ({ loggedInUser: null, access_token: null }), false, { type: 'auth/logout', payload: {} }),
      })
    ),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )

)
export default useAuthStore;