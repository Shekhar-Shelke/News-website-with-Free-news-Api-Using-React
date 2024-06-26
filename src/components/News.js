import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
 
  constructor() {
    super();
    console.log("Hello I am Contuctor from News component");
    this.state = {
      articles: [],
      loading:false,
      page:1
    };
  }
 async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=c9844676dcd4443a92cd611cf6a17f35&page=1";
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    this.setState({articles:parsedData.articles})
  }
  handlePrevClick = async() =>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c9844676dcd4443a92cd611cf6a17f35&page=${this.state.page-1}`;
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    

    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles
    })
  }
  handleNextClick = async() =>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=c9844676dcd4443a92cd611cf6a17f35&page=${this.state.page+1}`;
    let data=await fetch(url);
    let parsedData=await data.json()
    console.log(parsedData);
    

    this.setState({
      page:this.state.page+1,
      articles:parsedData.articles
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h2>Monkey News - Top Headline</h2>
        <div className="row">
        {this.state.articles.map((element)=>{

          return <div className="col-md-3 ms-3" key={element.url}>
            <NewsItem
              title={element.title?element.title.slice(0,45):""}
              description={element.description?element.description.slice(0,88):""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}/>
          </div>
        })}
         
        </div>
        <div className="container d-flex justify-content-between">
        
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}>&larr; previous</button>
        <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
