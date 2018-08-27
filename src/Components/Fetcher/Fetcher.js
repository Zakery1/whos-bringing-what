import React, { Component } from 'react';
import axios from 'axios';

export default class Fetcher extends Component {
    state = {
        loading: false, 
        error: null,
        data: null,
    }

    componentDidMount() {
        this.setState({loading: true})
        axios.get(this.props.url, {headers: this.props.headers}).then(response => {
            this.setState({data: response.data})
        }).catch(error => {
            this.setState({error})
        }).then(() => {
            this.setState({loading: false})
        })
    }
    render() {
        const { loading, error, data } = this.state;
        return (
          <div>
              {loading 
              ? <div>Loading...</div>
              : error 
                ? <div>Error message: {error.message}</div>
                : data 
                  ? this.props.render(data)
                  : <div>Waiting...</div>
              }
          </div>  
        );
    }
}