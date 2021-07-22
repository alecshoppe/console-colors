interface Props {
  colorCode: string
  colorHex?: string
  onClick: (colorCode: string) => void
  text: string,
  style?: object
}

function StyleButtonClass({colorCode, colorHex, onClick, text, style}: Props) {
  return (
    <div onClick={() => onClick(colorCode)} className="StyleButtonClass" style={{color: colorHex, ...style }}>
      {text}
    </div>
  )
}

export default StyleButtonClass