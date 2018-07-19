import React from "react";

// Somewhere in code
<AsyncComponent loader={() => import("./SomeComponent")} />

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: null };
  }
  componentDidMount() {
    this.props.loader().then(
      Component => this.setState({ Component })
    );
  }
  render() {
    const { Component } = this.state;
    const { Placeholder, ...props } = this.props;

    return Component ? <Component {...props} /> : <Placeholder />;
  }
}
AsyncComponent.propTypes = {
  loader: PropTypes.func.isRequired,
  Placeholder: PropTypes.node.isRequired,
};