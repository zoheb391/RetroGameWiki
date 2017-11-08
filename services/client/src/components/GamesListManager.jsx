import React from 'react'
import { Link } from 'react-router'

import { Game, AddGamePanel } from '../components'


const GamesListManager = props => {
    let { games, setSearchBar, searchBar,toggleModal, deleteGame, logout, user, updateGamesList } = props

    return (
        <div className='container scrollable'>
            <div className='row text-left'>
                <AddGamePanel
                    logout={logout}
                    user={user}
                />
            </div>
            <div className='row'>
                <input
                    type='search' placeholder='Search by Name'
                    className='form-control search-bar' onKeyUp={event => updateGamesList(event.target.value)} />
            </div>
            <div className='row'>
                {
                    games
                        .map((game, i) => {
                            return(
                                <Game {...game}
                                    key={game._id}
                                    i={i}
                                    deleteGame={deleteGame}
                                    toggleModal={toggleModal}
                                    user={user}
                                />
                            )
                        })

                    // games
                    //     .filter(game => game.name.toLowerCase().includes(searchBar))
                    //     .map((game, i) => {
                    //         return(
                    //             <Game {...game}
                    //                 key={game._id}
                    //                 i={i}
                    //                 toggleModal={toggleModal}
                    //                 deleteGame={deleteGame}
                    //                 user={user}
                    //             />
                    //         )})
                }
            </div>
        </div>
    )
}

export default GamesListManager
