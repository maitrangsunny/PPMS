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
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        alignSelf: 'center',
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px'
                    }
                }}
                contentLabel="Example Modal"
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>   Loading...</h2>
            </Modal>
        )
    }
}