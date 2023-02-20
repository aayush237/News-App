import React, { Component } from 'react'
import NewsItem from './NewsItem'

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
        let URL = "https://newsapi.org/v2/top-headlines?country=in&apiKey=51df0c847452447f83006c7fa0cae906&page=1&pageSize=20"
        let data = await fetch(URL);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }

    handlePrevClick = async () => {
      console.log("Clicked on previous");

      let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page - 1}&pageSize=20`
        let data = await fetch(URL);
        let parsedData = await data.json();
        console.log(parsedData);
        
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
    }

    handleNextClick = async () => {
      console.log("Clicked on next");
      if( this.state.page + 1 >  Math.ceil(this.state.totalResults/20)){

      }else{
        let URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page + 1}&pageSize=20`
        let data = await fetch(URL);
        let parsedData = await data.json();
        console.log(parsedData);
        
        this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
      }  
    }

  render() {
    return (
      <div className='container my-3'>
        <h1>NewsMonkey - Top Headlines</h1>
        <div className='row'>
        {this.state.articles.map((element) => {
        return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title:""} description={ element.description ? element.description: "" } imageURL={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsURL={element.url}/>
        </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News