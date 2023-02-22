import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

   capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

    constructor(props){
        super(props);
        console.log("Why do we need a constructor?!");
        this.state = {
            articles: [],
            loading: true, 
            page: 1,
            totalResults: 0
        }
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(URL);
        this.setState({loading: true});
        let parsedData = await data.json();
        console.log(parsedData);
        
        this.setState({articles: parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading: false,
        });
    }

    async componentDidMount(){
        // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=1&pageSize=${this.props.pageSize}`
        // let data = await fetch(URL);
        // this.setState({loading: true});
        // let parsedData = await data.json();
        
        // this.setState({articles: parsedData.articles, 
        //   totalResults: parsedData.totalResults,
        //   loading: false
        // });

        this.updateNews();
    }

    handlePrevClick = async () => {
      // console.log("Clicked on previous");

      // let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      //   let data = await fetch(URL);
      //   this.setState({loading: true});
      //   let parsedData = await data.json();
        
      // this.setState({
      //   page: this.state.page - 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })

      this.setState({
        page: this.state.page - 1
      })
      this.updateNews();
    }

    handleNextClick = async () => {
      // console.log("Clicked on next");
      // if(!(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize))){
      //   let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      //   this.setState({loading: true});
      //   let data = await fetch(URL);
      //   let parsedData = await data.json();
        
      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
      // }

      this.setState({
        page: this.state.page + 1
      })
      this.updateNews();
    }

    fetchMoreData = async () => {
      this.setState({page: this.state.page + 1});
      let URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(URL);
        let parsedData = await data.json();
        console.log(parsedData);
        
        this.setState({articles: this.state.articles.concat(parsedData.articles), 
          totalResults: parsedData.totalResults,
        });
    };
  

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin: "35px 0"}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className="container">  
        <div className='row'>
        {this.state.articles.map((element) => {
        return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title:""} description={ element.description ? element.description: "" } imageURL={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} 
            newsURL={element.url} author={element.author? element.author: "Unknown"} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        
        
      </>
    )
  }
}

export default News