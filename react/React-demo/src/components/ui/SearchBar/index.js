import React, { Component } from 'react'
import './index.less'

class SearchBar extends Component {
    componentDidUpdate() {
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div className='search-bar'>
                {this.props.children}
            </div>
        )
    }
}

export default SearchBar
