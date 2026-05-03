import { motion } from "framer-motion";
function LoadingCircleSpinner() {
  return (
    <div className="container">
      <motion.div
        className="spinner"
        animate={{ transform: "rotate(360deg)" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                
            }

            .spinner {
                width: 27px;
                height: 27px;
                border-radius: 70%;
                border: 3px solid pink;
                border-top-color: purple;
                will-change: transform;
            }
            `}
    </style>
  );
}

export default LoadingCircleSpinner;
