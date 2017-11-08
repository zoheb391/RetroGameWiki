import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'debounce'

import { Modal, GamesListManager } from '../components'

const mapStateToProps = state => ({
    name: state.app.name,
    // searchBar: state.app.searchBar,
    user: state.authentication.user,
    gamesList: state.games.list,
    selectedGame: state.games.selectedGame
})

const mapDispatchToProps = {
    initGames: () => ({ type: 'init::games'}),
    updateGamesList: searchTerm => ({ type: 'update::gameslist', payload: searchTerm }),
    selectGame: game => ({ type: 'setSelectedGame@app', payload: game }),
    deleteGame: index => ({ type: 'delete::game', payload: index }),
    logout: () => ({ type: 'do::logout'})
}


class GamesContainer extends Component {

    componentDidMount() {
        this.props.initGames()
    }

    toggleModal (index) {
        const { selectGame, gamesList } = this.props
        selectGame(gamesList[index]._source)
        $('#game-modal').modal()
    }

    render() {
        const { searchBar, gamesList, selectedGame, deleteGame, logout, user } = this.props
        const updateGamesList = debounce(this.props.updateGamesList, 600)

        return (
            <div>
                <Modal game={selectedGame} />
                <GamesListManager
                    games={gamesList}
                    searchBar={searchBar}
                    updateGamesList={updateGamesList}
                    toggleModal={this.toggleModal.bind(this)}
                    deleteGame={deleteGame}
                    logout={logout}
                    user={user}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
