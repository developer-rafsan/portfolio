export default function MultiRingSpinner({ size = 100, colors = ["#3498db", "#e74c3c"] }) {
  const ringStyle = (color, delay) => ({
    boxSizing: "border-box",
    display: "block",
    position: "absolute",
    width: size,
    height: size,
    border: `${size / 10}px solid ${color}`,
    borderRadius: "50%",
    borderTopColor: "transparent",
    animation: `spin 1.2s linear infinite`,
    animationDelay: delay,
  });

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111111"
  };

  return (
    <div style={{ ...containerStyle, height: "100vh" }}>
      {colors.map((c, i) => (
        <span key={i} style={ringStyle(c, `${i * 0.2}s`)}></span>
      ))}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      rafsan
    </div>
  );
}
