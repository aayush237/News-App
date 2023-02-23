import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageURL, newsURL, author, date, source} = this.props;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    };

    return (
      <div className='my-3'>
        <div className="card">
        <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>
          <span className="badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>{source}</span>
        </div>
        
        <img className="card-img-top" src={imageURL} alt="Cardcap"/>
        <div className="card-body">
    <h5 className="card-title">{title} ...</h5>
    <p className="card-text">{description} ...</p>
    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleDateString("en-US", options)}</small></p>
    <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem