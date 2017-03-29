import React, { Component, PropTypes } from 'react';

import { getTop, getLeft } from '../utils/element-utils';

import style from './style/index.css';

// https://www.baidu.com/s?wd=

class Index extends Component {

    constructor(props){
        super(props);

        this.state = {
            input: '',
            inputState: false
        };

        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    handleSearchButtonClick(e){

        redirectTo(`https://www.baidu.com/s?wd=${this.props.query}`);

    }

    handleSearchInputChange(e){
        this.setState({
            input: e.target.value
        });
    }

    componentDidMount(){

        let ctx = this;

        // 等待0.1秒，让浏览器完成界面渲染。
        setTimeout(() => {

            if(ctx.props.query)

                this.startWorking(ctx);
            
        }, 100);
    }

    startWorking(ctx){

        let searchInput = $(ctx.refs.searchInput);
        let searchButton = $(ctx.refs.searchButton);

        let cursor = $(this.refs.cursor);

        cursor.animate({
            left: searchInput.offset().left + 8,
            top: searchInput.offset().top + searchInput.height() / 2
        }, 1600, () => {

            cursor.hide();

            Promise.all(ctx.props.query.split('').map((c, i) => {
                return new Promise(resolve => {

                    setTimeout(() => {
                        resolve(c);
                    }, 300 * i);

                }).then(res => {

                    ctx.setState({
                        input: ctx.state.input + res
                    });

                });
            })).then(() => {

                cursor.show();

                cursor.animate({
                    left: searchButton.offset().left + searchButton.width() / 2,
                    top: searchButton.offset().top + searchButton.height() / 2

                }, 1800, () => {

                    redirectTo(`https://www.baidu.com/s?wd=${ctx.props.query}`);

                });

            });

        });


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

                <div className={style.tips}>
                    <p>
                        草泥马不会百度吗？要我帮你吗？
                    </p>
                </div>

            </div>
        );
    }
}

function redirectTo(url){

    window.location.href = url;

}

Index.propTypes = {
    query: PropTypes.string
};

Index.defaultProps = {
    query: 'Pwcong'
};

export default Index;