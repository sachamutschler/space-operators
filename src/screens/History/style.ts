import styled from "styled-components/native";
import { ScrollView } from 'react-native';

export const HistoryContainer = styled(ScrollView)`
    height: 55%;
    max-height: 55%;
    margin: auto;
    display: flex;
    width: 80%; 
    overflow: scroll;
`;

export const HistoryLine = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(25, 39, 40, 0.95);
  padding: 5px;
  margin-bottom: 20px;
  border-bottom-width: 6px;
  border-bottom-color: rgba(0, 0, 0, 0.5);
  border-left-width: 6px;
  border-left-color: rgba(0, 0, 0, 0.5);
  border-right-width: 6px;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-top-width: 6px;
  border-top-color: rgba(255, 255, 255, 0.5);
`;

export const NumberOfRounds = styled.Text`
  font-size: 40px;
  line-height: 40px;
  color: #00a6ff;
  font-family: 'VT323';
  text-shadow-offset: 2px 2px;
  text-shadow-color: #ad004b;
  text-shadow-radius: 0.1px;
  text-transform: uppercase;
`;

export const Players = styled.Text`
  font-size:18px;
  color:white;
  margin-left: 10px;
  font-family: 'Kanit';
`;