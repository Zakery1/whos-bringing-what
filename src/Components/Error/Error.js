import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch() {
        this.setState({hasError: !this.state.hasError})
    }
    render() {
        if(this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong!!</h1>
                </div>
            )
        }
        return this.props.children
    }
}
export default ErrorBoundary