import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";
import { useState } from "react";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;



const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = Object.fromEntries(formData);
  //   onSubmit(data);
  
  const [remainingChars, setRemainingChars] = useState(20);
  function handleInput(event) {
   const inputLength = event.target.value.length;
    const charsLeft = 20 - inputLength;
    setRemainingChars(charsLeft);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={onSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        maxLength="20"
 
        defaultValue={defaultData?.name}
        onInput={handleInput}
      />
<div>{remainingChars > 0
    ? `${remainingChars} characters left`
    : `No character left`}
</div>
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapURL}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
    
        defaultValue={defaultData?.description}
    
    
      ></Textarea>
        
           
      <StyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </StyledButton>
    </FormContainer>
  );
}
