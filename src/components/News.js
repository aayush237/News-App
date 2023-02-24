import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    const updateNews = async() => {
      props.setProgress(10);
      const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true);
      let data = await fetch(URL);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
      }
      
      useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
      }, [])
      

    // async componentDidMount(){
    //     // let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=1&pageSize=${props.pageSize}`
    //     // let data = await fetch(URL);
    //     // setState({loading: true});
    //     // let parsedData = await data.json();
        
    //     // setState({articles: parsedData.articles, 
    //     //   totalResults: parsedData.totalResults,
    //     //   loading: false
    //     // });

    //     updateNews();
    // }

    // const handlePrevClick = async () => {
    //   // console.log("Clicked on previous");

    //   // let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${state.page - 1}&pageSize=${props.pageSize}`
    //   //   let data = await fetch(URL);
    //   //   setState({loading: true});
    //   //   let parsedData = await data.json();
        
    //   // setState({
    //   //   page: state.page - 1,
    //   //   articles: parsedData.articles,
    //   //   loading: false
    //   // })

    //   setPage({
    //     page: page - 1
    //   })
    //   updateNews();
    // }

    // const handleNextClick = async () => {
    //   // console.log("Clicked on next");
    //   // if(!(state.page + 1>Math.ceil(state.totalResults/props.pageSize))){
    //   //   let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=51df0c847452447f83006c7fa0cae906&page=${state.page + 1}&pageSize=${props.pageSize}`
    //   //   setState({loading: true});
    //   //   let data = await fetch(URL);
    //   //   let parsedData = await data.json();
        
    //   // setState({
    //   //   page: state.page + 1,
    //   //   articles: parsedData.articles,
    //   //   loading: false
    //   // })
    //   // }

    //   setPage({
    //     page: page + 1
    //   })
    //   updateNews();
    // }

    const fetchMoreData = async () => {
      const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      setPage(page + 1)
        let data = await fetch(URL);
        let parsedData = await data.json()
        console.log(parsedData);
        

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
  
    // const fetchMoreData = async () => {   
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    //   setPage(page+1) 
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   setArticles(articles.concat(parsedData.articles))
    //   setTotalResults(parsedData.totalResults)
    // };


    return (
      <>
        <h1 className='text-center' style={{margin: "35px 0", marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

        <div className="container">  
        <div className='row'>
        {articles.map((element) => {
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

News.defaultProps = {
  country: "in",
  pageSize: 5, 
  category: ""
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string
}


export default News