import React, { Component, PropTypes } from 'react';

import { getTop, getLeft } from '../utils/element-utils';

import style from './style/index.css';

// https://www.baidu.com/s?wd=

class Index extends Component {

    constructor(props){
        super(props);

        this.state = {
            input: ''
        };

        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchButtonClick(e){


    }

    handleSearchInputChange(e){
        this.setState({
            input: e.target.value
        });
    }

    componentDidMount(){

        setTimeout(() => {

            if(this.props.query){

                let searchInput = $(this.refs.searchInput);
                let cursor = $(this.refs.cursor);

                cursor.animate({
                    left: searchInput.offset().left + 8,
                    top: searchInput.offset().top + searchInput.height() / 2
                }, 2000, () => {

                    cursor.hide();

                });

            }
        }, 100);
    }


    render() {
        
        return (
            <div className={style.root}>
                
                <div 
                    ref="cursor"
                    className={style.cursor}
                    style={{
                        backgroundImage: 'url(./static/img/cursor.png'
                    }}
                    >
                </div>

                <div className={style.logo}>
                    <a href="https://www.baidu.com">
                        <img src="./static/img/bd_logo.png" alt="Baidu Logo"/>
                    </a>
                </div>

                <div className={style.tools}>
                    <input
                        onChange={this.handleSearchInputChange}
                        ref="searchInput"
                        value={this.state.input} 
                        type="text" 
                        placeholder="这里输入要搜索的关键字"/>
                    <button
                        ref="searchButton"
                        onClick={this.handleSearchButtonClick}>
                        百度一下
                    </button>
                </div>

            </div>
        );
    }
}

Index.propTypes = {
    query: PropTypes.string
};

Index.defaultProps = {
    query: 'Pwcong'
};

export default Index;