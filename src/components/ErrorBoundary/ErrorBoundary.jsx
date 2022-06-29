import { Component } from 'react';
import { ErrorWrapper, ErrorTitle, ErrorText } from './ErrorBoundary.styles';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return(
                <ErrorWrapper>
                    <ErrorTitle>Something is not right</ErrorTitle>
                    <ErrorTitle>:-(</ErrorTitle>
                    <ErrorText>We're working on it. Please try again in some time.</ErrorText>
                </ErrorWrapper>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
