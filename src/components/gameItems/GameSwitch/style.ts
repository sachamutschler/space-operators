import styled from 'styled-components/native';


export const SwitchContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 40%;
    margin:5px;
    height: 15%;
    justify-content: space-around;
    background: rgba(0,0,0,0.7);
`;

export const SwitchButton = styled.Switch`
    margin: auto;
`;


export const SwitchText = styled.Text`
    margin: auto;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
`;