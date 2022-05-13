import React, { Component } from "react";
import { CartWrapper, CartHeader,CartHeaderTitle, CartHeaderContent, 
    CartContentWrappet, CartItemWrapper, ItemName, ItemNumber, Item, CartItemTitleWrapper, 
    CartItemTitle, Button, SummaryWrapper, Summarytext, Disappear} from "./style";
import { connect } from 'react-redux';
import { actionCreator as userActionCreators } from ".././User/store";
import { actionCreators as cartActionCreators } from "./store/index";

class Cart extends Component {
    render(){
        var storage=window.localStorage;
        var Islogin = storage.getItem("Islogin");
        var ID = storage.getItem("UID");
        this.props.getUserinfo(ID);
        if (Islogin === "login"){
        return(
            <CartWrapper>
                <CartHeader>
                <CartHeaderTitle>Cart</CartHeaderTitle>            
                <CartHeaderContent>User: <a href="/user">{this.props.username}</a></CartHeaderContent>
                </CartHeader>
                    

                    <CartContentWrappet>Pendding
                        <CartItemTitleWrapper>
                            <CartItemTitle>Product name</CartItemTitle>
                            <CartItemTitle>Quantity</CartItemTitle>
                            <CartItemTitle>Price</CartItemTitle>
                            <CartItemTitle>Total Price</CartItemTitle>
                        </CartItemTitleWrapper>
                        <h1>{this.getPenddingList()}</h1>
                    </CartContentWrappet>
                    

                    <CartContentWrappet>Cart
                        <CartItemTitleWrapper>
                            <CartItemTitle>Product name</CartItemTitle>
                            <CartItemTitle>Quantity</CartItemTitle>
                            <CartItemTitle>Price</CartItemTitle>
                            <CartItemTitle>Total Price</CartItemTitle>
                        </CartItemTitleWrapper>
                        <h1>{this.getCartList()}</h1>
                    </CartContentWrappet>


                    <SummaryWrapper>
                        <Summarytext>Total: ${this.props.CartTotalPrice}</Summarytext>
                        <Button><a href="/payment">Pay Now</a></Button>
                    </SummaryWrapper>
                    
            </CartWrapper>
        )
        }else{
            return(
                <CartWrapper>
                    <h1>Please Login</h1> 
                </CartWrapper>
            )
        }
    }

    componentDidMount(){
        var storage=window.localStorage;
        var ID = storage.getItem("UID");
        this.props.getUserinfo(ID);
        this.props.getcartInfo(ID);
        this.props.getpenddingInfo(ID);
    }

    getCartList(){
        const{cartlist} = this.props;
        var storage=window.localStorage;
        var ID = storage.getItem("UID");
        var Single = 0;
        var Total = 0;
        Total = Total + Single
        return cartlist.map((item) => {
            return[
                <CartItemWrapper>
                    <Item key={item.get('id')}>
                        <ItemName>{item.get('id')}</ItemName>
                        <ItemNumber>{item.get('number')}</ItemNumber>
                        <ItemNumber>{item.get('Price')}</ItemNumber>
                        <ItemNumber>{Single = item.get('number') * item.get('Price')}</ItemNumber>
                        <Disappear>{Total = Total + Single}</Disappear>
                        {this.getTotalPrice(Total)}
                        <Button onClick={() => this.props.deleteitem(ID,item.get('id'))}><a href="/cart">Delete</a></Button>
                    </Item>
                </CartItemWrapper>
            ]
        }
        )
    }

    getTotalPrice(Totalprice){
        var storage=window.localStorage;
        var ID = storage.getItem("UID");
        this.props.updateTotalPrice(ID, Totalprice);
    }

    getPenddingList(){
        const{penddinglist} = this.props;
        var storage=window.localStorage;
        var ID = storage.getItem("UID");
        return penddinglist.map((item) => {
            return(
                <CartItemWrapper>
                    <Item key={item.get('id')}>
                        <ItemName>{item.get('id')}</ItemName>
                        <ItemNumber>{item.get('number')}</ItemNumber>
                        <ItemNumber>{item.get('Price')}</ItemNumber>
                        <ItemNumber>{item.get('number') * item.get('Price')}</ItemNumber>
                        <Button onClick={() => this.props.deletependdingitem(ID,item.get('id'))}><a href="/cart">Delete</a></Button>
                    </Item>
                </CartItemWrapper>
            )
        })
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.get('login').get('login'),
        username: state.getIn(['user', 'name']),
        useremail: state.getIn(['user', 'email']),
        cartlist: state.getIn(['cart','cartlist']),
        penddinglist: state.getIn(['cart','penddinglist']),
        CartTotalPrice: state.getIn(['user','CartTotalPrice'])
    }
}

const mapDispathToProprs = (dispatch) => {
    return{
        getUserinfo(id){
            dispatch(userActionCreators.getUser(id))
        },
        getcartInfo(id){
            dispatch(cartActionCreators.getCart(id))
        },
        deleteitem(uid, itemID){
            dispatch(cartActionCreators.deleteCartitem(uid, itemID))
        },
        getpenddingInfo(id){
            dispatch(cartActionCreators.getPendding(id))
        },
        deletependdingitem(uid, itemID){
            dispatch(cartActionCreators.deletePenddingitem(uid, itemID))
        },
        updateTotalPrice(uid, TotalNumber){
            dispatch(cartActionCreators.updateTotalPrice(uid, TotalNumber))
        }
    }
}

export default connect(mapStateToProps, mapDispathToProprs)(Cart);