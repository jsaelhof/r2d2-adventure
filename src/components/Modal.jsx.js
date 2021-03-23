import React, { Component } from 'react';

class Modal extends Component {

  /**
   * Renders a modal dialog.
   * CSS transitions are used to fade the dialog in and out.
   * The modal-block div creates a shade that covers the game and prevents clicking outside the dialog.
   * Elements of the dialog are populated through props to allow this component to be re-used
   * for multiple dialgos in the game.
   */
  render() {
    return (
        <div className={this.props.show ? "modal modal-shown" : "modal modal-hidden"}>
          <div className="modal-block">
            <div className="modal-box">
              <div className="modal-image">
                <img src={this.props.image} alt=""/>
              </div>
              <div className="modal-content">
                <div className="modal-message">
                  { this.props.message }
                </div>
                <div className="modal-subtext">
                  { this.props.subtext || "" }
                </div>
                <div className="modal-buttons">
                  <button className="app-button" onClick={this.props.onConfirm}>{ this.props.buttonText }</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Modal;
