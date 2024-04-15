import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberTrue, setNumberTrue] = useState(false);
  const [characterTrue, setCharacterTrue] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook

  const passwordRef = useRef(null);

  //useCallback hook

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberTrue) str += "0123456789";
    if (characterTrue) str += "!@#$%^&*()_+{}";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberTrue, characterTrue, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //useEffect hook

  useEffect(() => {
    passwordGenerator();
  }, [length, numberTrue, characterTrue, passwordGenerator]);

  return (
    <>
      <h1 className="text-4xl text-center text-slate-50 font-semibold mt-10">
        Password Generator
      </h1>
      <div className="w-full max-w-lg mx-auto shadow rounded-lg px-8 py-5 text-orange-500 bg-slate-200 mt-5">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password Generator"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 hover:bg-blue-950 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberTrue}
              id="numberInput"
              onChange={() => {
                setNumberTrue((prev) => !prev);
              }}
            ></input>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterTrue}
              id="characterInput"
              onChange={() => {
                setCharacterTrue((prev) => !prev);
              }}
            ></input>
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
