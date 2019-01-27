import Modal from "react-modal";
import React, { Component } from "react";

export default class Loadig extends Component {
  render() {
    const { status, actionRight, actionLeft } = this.props;
    return (
      <Modal
        isOpen={status}
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
          },
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <h4>Bạn muốn xóa người này khỏi danh sách</h4>
          <div className="btn-confirm-customer text-center">
            <button
              className="btn btn-common btn-green"
              onClick={() => actionRight()}
            >
              Đồng Ý
            </button>
            <button
              className="btn btn-common btn-red"
              onClick={() => actionLeft()}
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
