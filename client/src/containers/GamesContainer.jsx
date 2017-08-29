import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, GamesListManager } from '../components'

const mapStateToProps = state => ({
    name: state.app.name,
    searchBar: state.app.searchBar
})

const mapDispatchToProps = {
    setSearchBar: value => ({ type: 'setSearchBar@app', payload: value })
}


class GamesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { games: [], selectedGame: {}, searchBar: '' }
        this.toggleModal = this.toggleModal.bind(this)
    //    this.deleteGame = this.deleteGame.bind(this);
    //    this.setSearchBar = this.setSearchBar.bind(this)
    }

    componentDidMount() {
        this.getGames()
    }

    getGames() {
        fetch('http://localhost:8080/api/games', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => this.setState({ games: data }))
    }

    // setSearchBar (event) {
    //     // this.setState({ searchBar: event.target.value.toLowerCase() })
    // }


    toggleModal (index) {
        this.setState({ selectedGame: this.state.games[index] })
        $('#game-modal').modal()
    }

    render() {
        const { games, searchBar, selectedGame } = this.state
        const { setSearchBar } = this.props

        return (
            <div>
                {/* <Modal game={selectedGame} /> */}
                <GamesListManager
                    games={games}
                    searchBar={searchBar}
                    setSearchBar={setSearchBar}
                    toggleModal={this.toggleModal}
                    deleteGame={this.deleteGame}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
