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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            alignSelf: "center",
          },
          content: {
            position: "absolute",
            top: "30%",
            left: "40%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <h4>Bạn muốn xóa người này khỏi danh sách</h4>
          <div className="btn-confirm-customer">
            <button
              className="btn btn-success col-xs-offset-2"
              onClick={() => actionRight()}
            >
              Đồng Ý
            </button>
            <button
              className="btn btn-danger col-xs-offset-3"
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
