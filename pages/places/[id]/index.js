import React from "react";
import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Modal from "react-modal";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "200px",
    borderRadius: "30px",
    padding: "20px",
    textAlign: "center",
  },
};

const ConfirmDeleteButton = styled(StyledButton)`
  &:hover {
    background-color: #ff5858;
  }
`;

const CancelButton = styled(StyledButton)`
  margin-left: 10px;

  &:hover {
    background-color: #eaeaea;
  }
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = React.useState(false);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePlace() {
    const response = await fetch(`/api/places/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }

    if (response.ok) {
      await response.json();
    }

    router.push("/");
  }

  function handleDeleteClick() {
    setShowConfirmationModal(true);
  }

  function confirmDelete() {
    setDeleteConfirmed(true);
    deletePlace();
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {place.name}, {place.location}
      </h2>
      <Link href={place.mapURL} passHref legacyBehavior>
        <StyledLocationLink target="_blank">Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{place.description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton
          onClick={handleDeleteClick}
          type="button"
          variant="delete"
          disabled={deleteConfirmed}
        >
          Delete
        </StyledButton>
      </ButtonContainer>
      <Modal
        isOpen={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
        style={customModalStyles}
        contentLabel="Confirm Delete"
      >
        <h3>Are you sure you want to delete?</h3>
        <div>
          <ConfirmDeleteButton onClick={confirmDelete} disabled={deleteConfirmed} variant="confirm">
            Yes
          </ConfirmDeleteButton>
          <CancelButton onClick={() => setShowConfirmationModal(false)} disabled={deleteConfirmed}>
            No
          </CancelButton>
        </div>
      </Modal>
    </>
  );
}
