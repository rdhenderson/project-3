import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import {getUser} from '../../helpers/index.js'

// import components
import ProfileForm from './components/ProfileForm'
import ThirdPartyAuth from '../common/ThirdPartyAuth'
import helpers from '../../helpers'
import HeadSearch from '../../components/headSearch.js'
import UserReview from './components/userReview.js'
import UProfDiv from './components/UProfDiv.js'

const sampleReviews = [{
    event : "The Reusable Code @ 930 Club 09/06/17",
    title: "The Guitarist was amazing",
    body: "This is the descrption",
    image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
  },
  {
    event : "The Who Needs Sleep @ 930 Club 07/19/17",
    title: "Well, you're never gonna get it",
    body: "This is the descrption",
    image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
  },
  {
    event : "The Fartz @ 930 Club 09/09/16",
    title: "The Guitarist was amazing",
    body: "This is the descrption",
    image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
  }];

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      makeEdit : false,
      showConnect: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleConnect = this.toggleConnect.bind(this);
  }

  handleSubmit(values) {
    event.preventDefault();
    console.log("Edited Profile", values);
    helpers.user.update({_id: this.props.user.user._id, ...values})
    .then( ({ data }) => {
      this.props.history.push('/profile');
    }).catch(err => console.log(err));
  }

  toggleEdit(){
    const newState = { makeEdit: !this.state.makeEdit }
    this.setState(newState);
  }

  toggleConnect(){
    const newState = { showConnect: !this.state.showConnect }
    this.setState(newState);
  }

  componentWillMount(){
    var userId = this.props.match.url.substring(9)
    getUser(userId).then(pageUser => {
      this.setState({
        name: pageUser.data.name,
        id: pageUser.data._id,
        profile_image: pageUser.data.profile_image,
        bands: pageUser.data.bands,
        reviews: pageUser.data.reviews,
        tags: pageUser.data.tags,
        venues: pageUser.data.venues
      });
    });

  }

  componentDidMount(){
  }

  render(){
    let user = this.props.user;
    var sampleReviews = [{
        event : "The Reusable Code @ 930 Club 09/06/17",
        title: "The Guitarist was amazing",
        body: "This is the descrption",
        image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
      },
      {
        event : "The Who Needs Sleep @ 930 Club 07/19/17",
        title: "Well, you're never gonna get it",
        body: "This is the descrption",
        image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
      },
      {
        event : "The Fartz @ 930 Club 09/09/16",
        title: "The Guitarist was amazing",
        body: "This is the descrption",
        image: "http://keycdn.theouterhaven.net/wp-content/uploads/2014/12/5star.png-610x0.png",
      }];

    return (
      <div className="profile">
        <HeadSearch />
        <div className="profile__topbody">

          <div className="profile__topbody__left">

            <UProfDiv profilePic={this.state.profile_image} uId={this.state.id} />
            <h1>{this.state.name} </h1>
            <div className="profile__topbody__left__details">
              <div id="bands">
                <h3> Bands </h3>
                <ul>
                  <li> The Fartz </li>
                  <li> Paid Against the Machine </li>
                  <li> Migos </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="profile__topbody__right">

            <div className="profile__topbody__right__sliders">
              <div id="Header">
                <h1 id="skillheader"> Skills </h1>
              </div>
              <div id="slidSkills">
                <div className="profile__topbody__right__sliders__sliderItem">
                  <h3> Professionalism </h3>
                  <img className="profile__topbody__right__sliders__sliderItem__slider" src="./img/Fader.png" />
                </div>
                <div className="profile__topbody__right__sliders__sliderItem">
                  <h3> Professionalism </h3>
                  <img className="profile__topbody__right__sliders__sliderItem__slider" src="./img/Fader.png" />
                </div>
                <div className="profile__topbody__right__sliders__sliderItem">
                  <h3> Professionalism </h3>
                  <img className="profile__topbody__right__sliders__sliderItem__slider" src="./img/Fader.png" />
                </div>
                <div className="profile__topbody__right__sliders__sliderItem">
                  <h3> Professionalism </h3>
                  <img className="profile__topbody__right__sliders__sliderItem__slider" src="./img/Fader.png" />
                </div>
              </div>
            </div>

          </div>

        </div>
        <UserReview reviews={sampleReviews} />

      <button onClick={this.toggleEdit}>Edit Profile</button>
      {this.state.makeEdit && (
        <ProfileForm user={user} onSubmit={this.handleSubmit}/>
      )}
      <button onClick={this.toggleConnect}>Connect Services</button>
      {this.state.showConnect && (
        <ThirdPartyAuth connect={true} />
      )}
    </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    isAuth: state.user.isAuth,
  };
}

function mapDispatchToProps(dispatch){
  // return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps)(ProfilePage);

// export default ProfilePage;
