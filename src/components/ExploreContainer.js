import React, { Component } from 'react'
import './ExploreContainer.css';
import {IonButton, IonLabel} from '@ionic/react'
import * as api from '../api/cocktail'
import ReactJson from 'react-json-view'

class ExploreContainer extends Component {

  state = {
    cocktailDrink: "",
    cocktailThumb: "",
    cocktailRaw: {},
    accessToken: ""
  }

  componentDidMount(){
    let localKeys = Object.keys(localStorage)

    localKeys.forEach(key => {
      if(key.includes("idToken")){

        api.getRandomCocktail(localStorage[key])
            .then(res => {
                var resObj = JSON.parse(res.data.body)
                var drinks = resObj.drinks
                this.setState({cocktailDrink: drinks[0].strDrink})
                this.setState({cocktailThumb: drinks[0].strDrinkThumb})
                this.setState({cocktailRaw: drinks[0]})
            })
      }
    })

    
  }

  handleCocktailClick = () => {
    api.getRandomCocktail(this.state.accessToken)
            .then(res => {
                var resObj = JSON.parse(res.data.body)
                var drinks = resObj.drinks
                this.setState({cocktailDrink: drinks[0].strDrink})
                this.setState({cocktailThumb: drinks[0].strDrinkThumb})
                this.setState({cocktailRaw: drinks[0]})
            })
  }

  render() {
    return (
      <div className="container">
        <strong>
          Click the "Cocktail" button to get a random cocktail
        </strong>
        <p style={{paddingTop: "20px", paddingBottom: "20px"}}>
          <strong>{this.state.cocktailDrink}</strong><br/>

          <img style={{paddingTop: "20px", paddingBottom: "20px"}} src={this.state.cocktailThumb} height="250vh" height="250vw" /><br/>

          
        </p>
        <IonLabel>Raw JSON Response: </IonLabel>
          <ReactJson 
            src={this.state.cocktailRaw} 
            collapsed={true}
          />
        <p>
          <IonButton onClick={() => this.handleCocktailClick()} color="danger">Cocktail</IonButton>
        </p>
      </div>
    );
  }
}


export default ExploreContainer;
