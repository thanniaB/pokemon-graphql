import React from 'react';
import styled from 'styled-components'

const PokeDisplay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
        margin-bottom: 8px;
    }
    .types {
        font-size: 1.5rem;
        margin-bottom: 5px;
    }
    tr td:first-child {
        text-decoration: underline;
    }
    img {
        width: 96px;
        height: 96px;
    }
`;

const getStatRow = (stat) => {
    return (
        <tr>
            <td>{stat.stat.name}</td>
            <td>{stat.base_stat}</td>
        </tr>
    )
};

function Pokemon(props) {
    const {pokemon} = props
    console.log(pokemon);
    const {name, types, stats, sprites} = pokemon;
    const spriteUrl = sprites ? sprites.front_default : undefined;
    const typeString = types ? types.map( type => type.type.name).join(', ') : '';

    if (name && types && stats && spriteUrl) {
        return (
            <PokeDisplay>
                <img src={spriteUrl} alt={`${name} sprite`}/>
                <div>
                    <h2>{name}</h2>
                    <div className="types">{typeString}</div>
                    <table>
                        <tbody>
                        {stats.map(stat => getStatRow(stat))}
                        </tbody>
                    </table>
                </div>

            </PokeDisplay>
        );
    } else {
        return (
            <PokeDisplay>
                <div>Search for a Pokemon to get started</div>
            </PokeDisplay>
        );
    }


}

export default Pokemon;
