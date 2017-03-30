import React, { Component, PropTypes } from 'react';

import style from './style/index.css';

import Modal from '../component/Modal';

import { 
    BAIDU_SEARCH,
    SINA_SHORTEN,
    APPID,
    SECRET
} from '../config';

class Index extends Component {

    constructor(props){
        super(props);

        this.state = {
            input: '',
            tips: '',
            modalActive: false,
            modalContent: '',
            previewable: false
        };

        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleGetShortURL = this.handleGetShortURL.bind(this);
    }

    handleSearchButtonClick(e){

        redirectTo(BAIDU_SEARCH + this.props.query);

    }

    handleSearchInputChange(e){
        this.setState({
            input: e.target.value
        });
    }

    handleGetShortURL(e){

        let ctx = this;

        ctx.setState({
            modalActive: true,
            modalContent: '正在生成中',
            previewable: false
        });

        let url_long = window.location.href.split('?')[0] + '?query=' + encodeURI(ctx.state.input);

        $.get(SINA_SHORTEN+`?showapi_appid=${APPID}&showapi_sign=${SECRET}&url_long=${url_long}`, res => {

            if(res.showapi_res_code === 0 && res.showapi_res_body.url_short){

                ctx.setState({
                    modalContent: res.showapi_res_body.url_short,
                    previewable: true
                });
            }else{
                ctx.setState({
                    modalContent: '地址生成失败'
                });
            }

        });
    }

    componentDidMount(){

        let ctx = this;

        // 等待0.1秒，让浏览器完成界面渲染。
        setTimeout(() => {

            if(ctx.props.query)

                this.startWorking(ctx);
            
        }, 1000);
    }

    startWorking(ctx){

        let searchInput = $(ctx.refs.searchInput);
        let searchButton = $(ctx.refs.searchButton);

        let cursor = $(this.refs.cursor);

        ctx.setState({
            tips: '有问题吗？'
        });

        cursor.show();

        cursor.animate({
            left: searchInput.offset().left + 8,
            top: searchInput.offset().top + searchInput.height() / 2
        }, 1600, () => {

            ctx.setState({
                tips: '百度一下就这么难吗？'
            });

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

                    redirectTo(BAIDU_SEARCH + ctx.props.query);

                });

            });

        });


    }


    render() {
        
        return (
            <div className={style.root}>
                
                <Modal 
                    content={this.state.modalContent}
                    positiveLabel="预览"
                    positiveEnable={this.state.previewable}
                    onPositiveButtonClick={(content) => {
                        redirectTo(content);
                    }}
                    negativeLabel="知道了"
                    onNegativeButtonClick={() => {
                        this.setState({
                            modalActive: false
                        });
                    }}
                    active={this.state.modalActive}/>

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
                    <button
                        style={{
                            marginLeft: '2px'
                        }}
                        onClick={this.handleGetShortURL}
                        >
                        生成地址
                    </button>
                </div>

                <div className={style.tips}>
                    <p>
                        {this.state.tips}
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
    query: ''
};

export default Index;