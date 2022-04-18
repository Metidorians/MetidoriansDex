import React from 'react'
import Image from '../Image'

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const MetidoriansLogo = () => {
  return (
    <>
      <div className="mt-4 mb-4 sm:hidden"></div>
      <div className="flex items-center hidden mt-8 mb-12 justify sm:block" style={{ minHeight: 40 }}>
        <Image src="/logo.png" alt="Metidorians" width={328} height={40} />
      </div>
    </>
  )
}

export default MetidoriansLogo
