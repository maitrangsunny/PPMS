import Modal from 'react-modal';
import React, {
    Component
} from 'react';

export default class Loadig extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.loading}
                // onAfterOpen={this.afterOpenModal}
                // onRequestClose={this.closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed",
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        alignSelf: "center",
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        border: "1px solid #ccc",
                        background: "#fff",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "20px",
                        transform: "translate(-50%, -50%)"

                    }
                }}
                contentLabel="Example Modal"
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>   Loading...</h2>
            </Modal>
        )
    }
}