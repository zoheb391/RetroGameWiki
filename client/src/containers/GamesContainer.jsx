import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, GamesListManager } from '../components'

const mapStateToProps = state => ({
    name: state.app.name,
    searchBar: state.app.searchBar,
    gamesList: state.games.list,
    selectedGame: state.games.selectedGame
})

const mapDispatchToProps = {
    setSearchBar: value => ({ type: 'setSearchBar@app', payload: value }),
    initGames: () => ({ type: 'getGames@app'}),
    selectGame: game => ({ type: 'getSelectedGame@app', payload: game }),
    deleteGame: index => ({ type: 'deleteGame@app', payload: index })
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
        const { setSearchBar, searchBar, gamesList, selectedGame, deleteGame } = this.props
        return (
            <div>
                <Modal game={selectedGame} />
                <GamesListManager
                    games={gamesList}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
                    toggleModal={this.toggleModal.bind(this)}
                    deleteGame={deleteGame}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
