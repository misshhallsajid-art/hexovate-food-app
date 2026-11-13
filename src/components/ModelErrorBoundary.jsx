import { Component } from 'react';

// If the 3D model cannot be loaded, show the static image instead of a blank page.
export default class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('3D model failed to load, showing the image instead:', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
