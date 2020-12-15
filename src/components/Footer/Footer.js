import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <hr style={{ width: "90%" }} />
        <h1
          style={{
            fontFamily: "Noto Sans JP",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "normal",
            margin: "15px 15px",
          }}
        >
          Copyright © 2020 - Made with ❤ by APlatform
        </h1>
      </footer>
    );
  }
}
