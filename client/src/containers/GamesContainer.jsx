import React, { Component } from 'react'
import { Modal, GamesListManager } from '../components'

export default class GamesContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { games: [], selectedGame: {}, searchBar: '' }
        this.toggleModal = this.toggleModal.bind(this)
    //    this.deleteGame = this.deleteGame.bind(this);
       this.setSearchBar = this.setSearchBar.bind(this)
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

    setSearchBar (event) {
        this.setState({ searchBar: event.target.value.toLowerCase() })
    }

    deleteGame (id) {
    }

    toggleModal (index) {
        this.setState({ selectedGame: this.state.games[index] })
        $('#game-modal').modal()
    }

    render() {
        const { games, selectedGame, searchBar } = this.state

        return (
            <div>
                <Modal game={selectedGame} />
                <GamesListManager
                    games={games}
                    searchBar={searchBar}
                    setSearchBar={this.setSearchBar}
                    toggleModal={this.toggleModal}
                    deleteGame={this.deleteGame} />
            </div>
        )
    }
}
