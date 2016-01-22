const Popup = {

    getInitialState() {
        return {
            showPopup: false
        };
    },

    showPopup() {
        this.setState({showPopup: true});
    },

    hidePopup() {
        this.setState({showPopup: false});
    }

};

export default Popup;
