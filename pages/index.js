import styled from "styled-components";
import { useState } from "react";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;


  
`;

const ListItem = styled.li`
  position: relative;
  width: 85%;
  background-color: lights;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s, transform 0.3s;
  border: 1px solid #e0e0e0; /* Change the border color */


  &:hover .info-text {
    opacity: 1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const InfoText = styled.span`
position: absolute;
top: 40px;
left: 65%;
transform: translateX(-50%);
color: black;
font-size: 16px;
font-weight: bold;
pointer-events: none;
opacity: 0;
transition: opacity 0.3s;
border: 2px solid black;
padding: 5px 10px;
border-radius: 5px;
background-color: white;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);


&:hover {
  opacity: 1;
}


@media screen and (max-width: 768px) {
  font-size: 14px;
  top: calc(10% + 4px);
  left: 15%;
}
`;

const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 70px;
  right: 50px;

`;

export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handleMouseEnter = (name) => {
    setSelectedPicture(name);
  };

  const handleMouseLeave = () => {
    setSelectedPicture(null);
  };

  return (
    <>
      <List role="list">
        {data.map((place) => (
          <ListItem
            key={place._id}
            onMouseEnter={() => handleMouseEnter(place.name)}
        
          >
            <Card
              name={place.name}
              image={place.image}
              location={place.location}
              id={place._id}
            />
            {/* <InfoIcon /> */}
            {selectedPicture === place.name && (
              <InfoText className="info-text">{selectedPicture}</InfoText>
            )}
          </ListItem>
        ))}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
