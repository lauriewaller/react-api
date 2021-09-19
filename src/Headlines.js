import React from "react";
import { connect } from "react-redux";
import { makeApiCall } from "./actions";

class Headlines extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Now we'll use dispatch() to make our API call.
    const { dispatch } = this.props;
    dispatch(makeApiCall());
  }
  // Of course, there is a downside to this - the potential to hit API limits very quickly. Any time the component is reloaded, another call will be made. If you're using this approach to make calls to an API that has strict limits, we recommend being careful about having a local server running while you're working - because every time you make a change to your code, it'll trigger a component reload and another API call.

  render() {
    const { error, isLoading, headlines } = this.props;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) => (
              <li key={index}>
                <h3>{headline.title}</h3>
                <p>{headline.abstract}</p>
              </li>
            ))}
          </ul>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error,
  };
};

export default connect(mapStateToProps)(Headlines);
// This will allow us to wrap our component with an HOC that provides Redux functionality such as the dispatch() function.
// Our component will mount before we make an API call. We'll put the code for the API call in the componentDidMount lifecycle method so it runs as soon as our component is mounted. Once the call is complete, isLoaded will be switched to true.
