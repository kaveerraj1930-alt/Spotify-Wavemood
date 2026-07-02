import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

function ErrorToast({ error, onClose }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="flex-1">
              <p className="font-semibold">Error</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-700 rounded-full transition-colors"
              aria-label="Close error"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ErrorToast
