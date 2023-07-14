import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  border: 2.5px solid lightsalmon;
  border-radius: 0.8rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* Styles for smaller screens */
  @media screen and (max-width: 480px) {
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 25rem;

  /* Styles for smaller screens */
  @media screen and (max-width: 480px) {
    height: 15rem;
  }
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const InfoContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  margin-top: 8px;
  background-color:lightgray;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt=""
          />
        </ImageContainer>
        <InfoContainer>
          <figcaption>{name}</figcaption>
          <BoldText>Location: {location}</BoldText>
        </InfoContainer>
      </Figure>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}