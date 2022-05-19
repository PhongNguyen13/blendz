import React, { Component } from "react";
import { connect } from 'react-redux';
import { DetailWrapper, Itemimg, ItemInfo, Description, Button, InputWrapper, InputButton ,Input} from "./style";
import * as actionCreators from './store/actionCreators';


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '1'};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeplusone = this.handleChangeplusone.bind(this);
        this.handleChangeminusone = this.handleChangeminusone.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChangeplusone(event) {
        let plus = this.state.value;
        plus++;
        this.setState({value: plus})
        this.props.updateQuantity(plus);
    }

    handleChangeminusone(event){
        let minus = this.state.value;
        if (minus === 1) {
            this.setState({value: 1})
        }else if (minus >= 2){
            minus--;
            this.setState({value: minus})
            this.props.updateQuantity(minus);
        }
    }

    render(){
        //console.log(this.props.data.description)
        var storage=window.localStorage;
        var UID = storage.getItem("UID");
        let Price = this.props.data.priceforPay;
        let Type = this.props.data.type;
        return(
            <DetailWrapper>
                <Itemimg>
                    <img src={this.props.data.imgUrl} alt=''/>
                </Itemimg>
                <ItemInfo>         
                    <h1>{this.props.data.name}</h1>
                    <p>{this.props.data.price}</p>
                    <h2>Quantity</h2>
                    <InputWrapper>
                        <InputButton onClick={this.handleChangeminusone}>-</InputButton>
                        <Input value={this.props.Quantity} onChange={this.handleChange}> {this.props.Quantity} </Input>
                        <InputButton onClick={this.handleChangeplusone}>+</InputButton>
                    </InputWrapper>
                    <Button onClick={() => this.props.putIteminCart(UID,this.props.match.params.id, this.props.Quantity , Price, Type)}>
                        <a href={`/shop/detail/${this.props.match.params.id}`}>Put it in Cart</a></Button>
                </ItemInfo>
                <Description> 
                    <h1>Description</h1>
                    {this.getDesc()}
                </Description>
            </DetailWrapper>
        )
    }
    componentDidMount(){
        var storage=window.localStorage;
        var Select = storage.getItem("Select");
        if (Select === "Machine"){
            this.props.getMachine(this.props.match.params.id);
        }else if (Select === "Beverage"){
            this.props.getBeverage(this.props.match.params.id);
        }else if(Select === "Accessorie"){
            this.props.getAccessorie(this.props.match.params.id);
        }else{
            return console.log("error to get detail");
        }
    }

    getDesc() {
        const des = this.props.data.description;
        if(typeof des == "undefined" || des == null || des == ""){
            return(
                <h1>No description</h1>
            )
        }else{
            return(
                <div dangerouslySetInnerHTML={{__html: des}}/>
            )
        }
    }
}

const mapStateTothis= (state) =>{
    return{
        Quantity: state.getIn(['detail', 'Quantity']),
        data: state.getIn(['detail', 'data'])
    }
}
const mapDispathTothis = (dispatch) =>({
    getMachine(id){
        dispatch(actionCreators.getMachineDetail(id));
    },
    getBeverage(id){
        dispatch(actionCreators.getBeverageDetail(id));
    },
    getAccessorie(id){
        dispatch(actionCreators.getAccessorieDetail(id));
    },
    putIteminCart(UID, itemID, number, Price, Type){
        dispatch(actionCreators.postItem(UID, itemID, number, Price, Type));
    },
    updateQuantity(number){
        dispatch(actionCreators.QUANTITY(number));
    }
})

export default connect(mapStateTothis, mapDispathTothis)(Detail);