import React, { Component, PropTypes } from 'react';

import style from './style.css';

class Modal extends Component {

    constructor(props){
        super(props);

        this.handleNegativeButtonClick = this.handleNegativeButtonClick.bind(this);
        this.handlePositiveButtonClick = this.handlePositiveButtonClick.bind(this);

    }

    handlePositiveButtonClick(e){

        this.props.onPositiveButtonClick(this.props.content);

    }

    handleNegativeButtonClick(e){

        this.props.onNegativeButtonClick(this.props.content);

    }


    render() {
        return (
            <div className={style.root + ' ' + (this.props.active ? style.active : '')}>
                
                <div className={style.content}>

                    <div className={style.main}>
                        {this.props.content}
                    </div>
                    <div className={style.tools}>
                        <button
                            disabled={!this.props.positiveEnable}
                            onClick={this.handlePositiveButtonClick}>
                            {this.props.positiveLabel}
                        </button>
                        <button
                            disabled={!this.props.negativeEnable}
                            onClick={this.handleNegativeButtonClick}>
                            {this.props.negativeLabel}
                        </button>
                    </div>

                </div>



            </div>
        );
    }
}

Modal.propTypes = {
    active: PropTypes.bool,
    content: PropTypes.string,
    positiveEnable: PropTypes.bool,
    positiveLabel: PropTypes.string,
    negativeEnable: PropTypes.bool,
    negativeLabel: PropTypes.string,
    onNegativeButtonClick: PropTypes.func,
    onPositiveButtonClick: PropTypes.func
};

Modal.defaultProps = {
    active: true,
    content: 'Modal',
    positiveEnable: true,
    positiveLabel: 'OK',
    negativeEnable: true,
    negativeLabel: 'Cancel',
    onPositiveButtonClick(){
        console.log('positive');
    },
    onNegativeButtonClick(){
        console.log('negative');
    }
};

export default Modal;