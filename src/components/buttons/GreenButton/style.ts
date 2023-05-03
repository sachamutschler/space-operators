import styled from 'styled-components/native';

type ButtonProps = {
    active: boolean;
};

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => (props.active ? '#0fa200' : 'grey')};
  padding: 5px 20px;
  border-bottom-width: 6px;
  border-bottom-color: rgba(0, 0, 0, 0.5);
  border-left-width: 6px;
  border-left-color: rgba(0, 0, 0, 0.5);
  border-right-width: 6px;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-top-width: 6px;
  border-top-color: rgba(255, 255, 255, 0.5);
  height: 60px;
  width: 60%;
  margin:0 auto 0 auto;
`;

export const ButtonText = styled.Text`
  font-size: 40px;
  line-height: 40px;
  color:white;
  text-shadow-offset: 2px 2px;
  text-shadow-color: black;
  text-shadow-radius: 0.1px;
  text-transform: uppercase;
  font-family: 'VT323';
  margin:auto;
`;