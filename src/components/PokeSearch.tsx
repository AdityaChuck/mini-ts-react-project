import React, { useRef, useState } from "react";

interface PokeSearchProps {
  name: string;
  numberOfPokemons: number;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface State {
  name: string;
  numberOfAbilites: number;
  baseExperience: number;
  imageUrl: string;
}

export const PokeSearch: React.FC<PokeSearchProps> = ({
  name,
  numberOfPokemons,
  handleSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  //eslint-disable-next-line
  const [error, setError] = useState<boolean>(false);
  //eslint-disable-next-line
  const [info, setInfo] = useState<State>({
    name: "",
    numberOfAbilites: 0,
    baseExperience: 0,
    imageUrl: "",
  });
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const val = inputRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${val}`).then((res) => {
      if (res.status !== 200) {
        setError(true);
        return;
      }
      res.json().then((data) => {
        setError(false);
        setInfo({
          name: data.name,
          numberOfAbilites: data.abilities.length,
          baseExperience: data.base_experience,
          imageUrl: data.sprites.front_default,
        });
      });
    });
  };

  let resultMarkup = () => {
    if (error) {
      return <p>Pokemon not found, please try again!</p>;
    } else {
      return (
        <>
          <img src={info.imageUrl} alt="Pokemon" className="poke-image" />
          <p>
            {info.name} has {info.numberOfAbilites} abilities and{" "}
            {info.baseExperience} base experience points
          </p>
        </>
      );
    }
  };

  return (
    <div>
      {/* <p>
        User {name} has {numberOfPokemons} Pokemons
      </p> */}

      <br/>
      <form onSubmit={onSearch}>
        <input type="text" ref={inputRef} onChange={(e) => handleSearch(e)} />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      <br />
      <br />

      {info.name.length !== 0 && resultMarkup()}
    </div>
  );
};
