import styled from 'styled-components/native';
interface Props {
    type?: string;
    value?: string;
}

export const ButtonContainer = styled.TouchableOpacity<Props>`
  background-color: ${(props) => (props.type === 'color' ? props.value : '#2196F3')};
  width: 45%;
  margin:5px;
  height: 15%;
  border-bottom-width: 6px;
  border-bottom-color: rgba(0, 0, 0, 0.5);
  border-left-width: 6px;
  border-left-color: rgba(0, 0, 0, 0.5);
  border-right-width: 6px;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-top-width: 6px;
  border-top-color: rgba(255, 255, 255, 0.5);
`;

export const ButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    font-family: 'VT323';
    text-transform: uppercase;
    color:white;
    text-shadow-offset: 2px 2px;
    text-shadow-color: black;
    text-shadow-radius: 0.1px;
    margin:auto;
`;