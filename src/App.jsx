import { useState, useCallback,useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isAllowednum, setIsAllowednum] = useState(false);
  const [isAllowedchar, setIsAllowedchar] = useState(false);
  const handelGenerate = useCallback((e)=>{
    setLength(e.target.value);
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isAllowedchar) {
      string += "!@#$%&()_";
    }
    if (isAllowednum) {
      string += "0123456789";
    }
    let pass = "";
    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setPassword((prev)=>prev=pass);
  },[isAllowedchar,isAllowednum,length]);
  const passRef = useRef(null);
  const copyPassword = () =>{
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
  }
  return (
    <>
      <div className="bg-gradient-to-r from-green-700 to-lime-600 flex justify-center items-center flex-col gap-2 w-[50vh] mt-10 p-5 rounded-lg">
        <span>Password Generator</span>
        <div className="flex justify-center items-center gap-1">
          <input
            type="text"
            placeholder="password"
            value={password}
            readOnly
            name="pass"
            id=""
            className="w-[100%] outline-none"
            ref={passRef}
          />
          <button onClick={copyPassword} className="flex justify-center items-center bg-blue-400 rounded-md px-1">
            copy
          </button>
        </div>
        <div className="flex justify-center items-center gap-1">
          <input
            type="range"
            value={length}
            min={6}
            onChange={handelGenerate}
            name=""
            id=""
          />{length}
          <input
            type="checkbox"
            name=""
            id="num"
            defaultChecked={isAllowednum}
            onChange={() => setIsAllowednum(!isAllowednum)}
          />
          <label htmlFor="num">Number</label>
          <input
            type="checkbox"
            name=""
            id="char"
            defaultChecked={isAllowedchar}
            onChange={() => setIsAllowedchar(!isAllowedchar)}
          />
          <label htmlFor="char">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
