'use client'
import 'react-toastify/dist/ReactToastify.css'
import 'simplebar-react/dist/simplebar.min.css'
import 'flatpickr/dist/themes/light.css'
import 'leaflet/dist/leaflet.css'
import './scss/app.scss'
import { Provider } from 'react-redux'
import store from '../store'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout({ children }) {
    const queryClient = new QueryClient()

    return (
        <>
            <html lang="en">
                <body className="font-inter custom-tippy dashcode-app">
                    <Provider store={store}>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </Provider>
                </body>
            </html>
        </>
    )
}
