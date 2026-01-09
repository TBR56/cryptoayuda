import '@/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleStart = () => setIsLoading(true)
        const handleComplete = () => setIsLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[9999] origin-left"
                        style={{ scaleX: 1 }}
                    >
                        <motion.div
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            animate={{ x: ['0%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <Component {...pageProps} />
        </>
    )
}
