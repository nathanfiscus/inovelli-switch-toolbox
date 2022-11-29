import React from "react";

class WS2812 extends React.Component {
  render() {
    return (
      <div
        className={this.props.className}
        style={{
          background: `rgba(${this.props.color.join()},${
            this.props.level || 0
          })`,
          transition: "all 0.3s",
        }}
      />
    );
  }
}
export default WS2812;
