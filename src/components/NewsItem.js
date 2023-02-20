import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageURL, newsURL} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: 18 + "rem"}}>
        <img className="card-img-top" src={imageURL} alt="Cardcap"/>
        <div className="card-body">
    <h5 className="card-title">{title} ...</h5>
    <p className="card-text">{description} ...</p>
    <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem