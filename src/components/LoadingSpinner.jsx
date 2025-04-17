import React from "react"

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .spinner {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        
        .spinner div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: linear-gradient(to right, #8b5cf6, #6d28d9);
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        
        .spinner div:nth-child(1) {
          left: 8px;
          animation: spinner1 0.6s infinite;
        }
        
        .spinner div:nth-child(2) {
          left: 8px;
          animation: spinner2 0.6s infinite;
        }
        
        .spinner div:nth-child(3) {
          left: 32px;
          animation: spinner2 0.6s infinite;
        }
        
        .spinner div:nth-child(4) {
          left: 56px;
          animation: spinner3 0.6s infinite;
        }
        
        @keyframes spinner1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes spinner3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        
        @keyframes spinner2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
