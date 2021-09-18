import React from "react";

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      headlines: [],
    };
  }

  makeApiCall = () => {
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        this.setState({
          isLoaded: true,
          headlines: jsonifiedResponse.results,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  };

  componentDidMount() {
    this.makeApiCall();
  }
  // Of course, there is a downside to this - the potential to hit API limits very quickly. Any time the component is reloaded, another call will be made. If you're using this approach to make calls to an API that has strict limits, we recommend being careful about having a local server running while you're working - because every time you make a change to your code, it'll trigger a component reload and another API call.

  render() {
    const { error, isLoaded, headlines } = this.state;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
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

export default Headlines;

// Our component will mount before we make an API call. We'll put the code for the API call in the componentDidMount lifecycle method so it runs as soon as our component is mounted. Once the call is complete, isLoaded will be switched to true.
