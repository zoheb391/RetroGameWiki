import React from 'react'
import { Link } from 'react-router'

const Layout = props => (
    <div className='view'>
        <nav className='navbar navbar-inverse'>
            <div className='container'>
                <div className='navbar-header'>
                    <button
                        type='button'
                        className='navbar-toggle collapsed'
                        data-toggle='collapse'
                        data-target='#navbar'
                        aria-expanded='false'
                        aria-controls='navbar'>
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                    </button>
                    <Link to='/' className='navbar-brand'>
                        <img src='https://cdn.filestackcontent.com/nLnmrZQaRpeythR4ezUo' className='header-logo' />
                    </Link>
                </div>
            </div>
        </nav>
        {props.children}
        <footer className="text-center">
            <p>https://github.com/zoheb391/RetroGameWiki</p>
        </footer>
    </div>
)

export default Layout
