import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner';

export class News extends Component {

    constructor(){
        super();
        console.log("Why do we need a constructor?!");
        this.state = {
            articles: [],
            loading: false, 
            page: 1
        }
    }

    async componentDidMount(){
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=1&pageSize=${this.props.pageSize}`
        let data = await fetch(URL);
        this.setState({loading: true});
        let parsedData = await data.json();
        
        this.setState({articles: parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading: false
        });
    }

    handlePrevClick = async () => {
      console.log("Clicked on previous");

      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(URL);
        this.setState({loading: true});
        let parsedData = await data.json();
        
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      })
    }

    handleNextClick = async () => {
      console.log("Clicked on next");
      if(!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(URL);
        let parsedData = await data.json();
        
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      }
    }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: "35px 0"}}>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element) => {
        return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title:""} description={ element.description ? element.description: "" } imageURL={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} 
            newsURL={element.url} author={element.author? element.author: "Unknown"} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News