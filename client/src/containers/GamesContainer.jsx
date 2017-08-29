import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, GamesListManager } from '../components'

const mapStateToProps = state => ({
    name: state.app.name,
    searchBar: state.app.searchBar,
    gamesList: state.games.list
})

const mapDispatchToProps = {
    setSearchBar: value => ({ type: 'setSearchBar@app', payload: value }),
    initGames: () => ({ type: 'getGames@app'})
}


class GamesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { games: [], selectedGame: {}, searchBar: '' }
        this.toggleModal = this.toggleModal.bind(this)
    //    this.deleteGame = this.deleteGame.bind(this);
    }

    componentDidMount() {
        this.props.initGames()
    }

    toggleModal (index) {
        this.setState({ selectedGame: this.state.games[index] })
        $('#game-modal').modal()
    }

    render() {
        const { setSearchBar, searchBar, gamesList } = this.props
        return (
            <div>
                {/* <Modal game={selectedGame} /> */}
                <GamesListManager
                    games={gamesList}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
                    toggleModal={this.toggleModal}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
