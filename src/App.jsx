import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.serSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-+={}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]) // this array for optimization

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) // this array for re-run if somehing changed

  return (
    <>
      <div className="max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-fuchsia-400 bg-gray-700">
        <h1 className="text-4xl text-center text-white my-3">Password Generator</h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="w-full py-1 px-3 outline-none bg-white text-black"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-500 hover:bg-blue-600 text-white active:scale-95 transition transform text-white px-3 py-2 rounded"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex items-center gap-x-4 text-sm mb-4">
          <label>Length:</label>
          <input
            type="range"
            min={8}
            max={100}
            className="cursor-pointer"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <span>{length}</span>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
