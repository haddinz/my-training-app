import { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchBox = () => {
  const currentPath = useLocation().pathname;
  const [seacrh, setSearch] = useState<string>("");
  const submitHandler = () => {
    return "ok";
  };
  return (
    <>
      {currentPath === "/" ? (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="seacrh"
              id="search"
              placeholder="input search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">search</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default SearchBox;
