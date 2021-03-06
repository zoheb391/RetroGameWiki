import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, GamesListManager } from '../components'

const mapStateToProps = state => ({
    name: state.app.name,
    searchBar: state.app.searchBar,
    user: state.authentication.user,
    gamesList: state.games.list,
    selectedGame: state.games.selectedGame
})

const mapDispatchToProps = {
    setSearchBar: value => ({ type: 'setSearchBar@app', payload: value }),
    initGames: () => ({ type: 'init::games'}),
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
        selectGame(gamesList[index])
        $('#game-modal').modal()
    }

    render() {
        const { setSearchBar, searchBar, gamesList, selectedGame, deleteGame, logout, user } = this.props
        return (
            <div>
                <Modal game={selectedGame} />
                <GamesListManager
                    games={gamesList}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
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
