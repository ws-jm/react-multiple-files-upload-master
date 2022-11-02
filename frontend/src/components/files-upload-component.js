import React, { Component } from 'react';
import axios from 'axios';
import mydata from '../mydata.json';


export default class FilesUploadComponent extends Component {

    constructor(props) {
        super(props);
    }

    onClickHandler(){
        var uploaddata = {};

        mydata.map((data) => {
            uploaddata = {
                "name" : data.nickname,
                "phonenumber" : data.pnum,
                "imageurl" : data.photos[0].urls
            }
            axios.post("http://localhost:4000/api/upload-images", uploaddata,{
            }).then(res => {
                console.log(res.data)
            })
        })
    }

    render() {

        return (

            <div className="container">
                <button onClick={this.onClickHandler} className='btn btn-primary'>Image Upload</button>
                <div id="features" className="cards-1">
                    <div className="container">
                        {mydata.map((data) => {
                            return (
                                <div className="card" key={data.nickname}>
                                    <div className="card-image">
                                        {/* <img src='https://photo-cdn.ashleymadison.com/89543895138327735TB3BF7BA1CCDB5D2' alt="alternative" /> */}
                                        <img src='http://localhost:3000/img/img_avatar1.png' alt="alternative" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{data.nickname}</h5>
                                        <p className="mb-4">{data.pnum}</p>
                                        <p className="mb-4">{data.country}</p>
                                        <p className="mb-4">{data.city}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}