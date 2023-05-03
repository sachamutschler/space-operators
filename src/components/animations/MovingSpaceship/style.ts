import styled from 'styled-components/native';

export const MovingSpaceshipImage = styled.Image.attrs(
    (props) => (
            {
                id: props.id,
            }
        )
    )`
    width: 30vw;
    aspect-ratio: 1/1;
    position: absolute;
    right: -30vw;
`;

