import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Pokemon from "./components/Pokemon";

const Header = styled.header`
    background-color: #a42237;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    padding: 15px;
`;

const SearchInput = styled.input`
    margin: 1rem;
    padding: 0.5rem;
    border: 2px solid gray;
    border-radius: 5px;
    width: 100%;
`;

const Main = styled.main`
    max-width: 800px;
`;

const Error = styled.div`
    color: red;
    margin-left: 15px;
`;

function App() {
  const [searchText, setSearchText] = useState();
  const [pokemon, setPokemon] = useState({});
  const [error, setError] = useState();

  const handleSearchboxChange = (event) => {
    setTimeout(() => {
      setSearchText(event.target.value);
    }, 1000);
  }

  const gqlQuery = `query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites {
          front_default
        }
        stats {
          stat {
            name
          }
          base_stat
        }
        types {
          type {
            name
          }
        }
      }
    }`;

  useEffect(() => {
    let isMounted = true;
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://graphql-pokeapi.graphcdn.app/', {
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: gqlQuery,
                variables: {"name": searchText},
            }),
            method: 'POST',
        });
        if (isMounted) {
          const responseJson = await response.json();
          setPokemon(responseJson.data.pokemon);
          setError('');
        }
      } catch (error) {
        setError(error.toString());
      }
    }

    if(searchText) {
      fetchPokemon().then(r => r);
    }

    return () => {
      isMounted = false;
    };
  }, [searchText, gqlQuery]);

  return (
      <div className="App">
        <Header>
          My React Pokedex with GraphQL
        </Header>
        <Main>
          <SearchInput type="text" placeholder="Enter a pokemon name" onChange={handleSearchboxChange}/>
          <Error>{error}</Error>
          <Pokemon pokemon={pokemon}/>
        </Main>
      </div>
  );
}

export default App;
