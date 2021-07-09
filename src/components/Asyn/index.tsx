import { useEffect, useState } from "react"

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsButtonVisible(true)
      setIsButtonInvisible(true)
    }, 3000)
  }, [])

  return (
    <div>
      <div>Hello World</div>
      {isButtonVisible && <button>Botão 1</button>}
      {!isButtonInvisible && <button>Botão 2</button>}
    </div>

  )
}