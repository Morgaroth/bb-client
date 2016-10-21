import React, {Component, PropTypes} from "react";

class MarketToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        return (
           <a style={{color: 'white', backgroundColor: '#111'}} >{text}</a>
        )
    }
}


MarketToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default MarketToken;