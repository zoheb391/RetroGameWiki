import '../dist/css/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'

//HTTP request from client to server in future
const filepickerAPI = 'ArwYH0JcASoaSqoNgE7EYz'

filepicker.setKey(filepickerAPI)

ReactDOM.render(
    Routes,
    document.getElementById('content')
)
