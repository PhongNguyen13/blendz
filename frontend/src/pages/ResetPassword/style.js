import styled from "styled-components";

export const ResetWrapper = styled.div`
    // z-index:-1;
    // position absolute;
    top: 0;
    bottom 0;
    left: 0;
    right: 0;
    padding-top:5%;
    margin-bottom:5%;
`;

export const ResetBox = styled.div`
    width: 400px;
    height: 270px;
    margin: 8% auto;
    background: white;
    padding-top: 3%;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const Content = styled.div`
    &.Title{
        text-align: center;
        font-size: 150%;
    }
    &.STitle{
        margin-top: 10%;
        margin-left:20%;
        font-size: 100%;
    }

`;

export const Input = styled.input`
    display: block;
    width: 50%;
    height: 13%;
    padding: 0 5%;
    margin:auto;
    color: #777;
    margin-top: 1%;

`;

export const Button = styled.div`
    width: 50%;
    height: 13%;
    line-height: 150%;
    color: #fff;
    background: #E17631;
    border-radius: 2%;
    margin: 10% auto 5%;
    text-align: center;
    font-size: 150%;
    cursor: pointer;
`;