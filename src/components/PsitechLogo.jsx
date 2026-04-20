function PsitechLogo({ height = 34 }) {
  return (
    <img
      src="/logo.png"
      alt="Psitech"
      height={height}
      className="psitech-logo-img"
      style={{ height: `${height}px`, width: 'auto', display: 'block', objectFit: 'contain' }}
    />
  )
}

export default PsitechLogo
