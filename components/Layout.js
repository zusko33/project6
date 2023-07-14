import TitleBar from "./TitleBar.js";
import styled from "styled-components";
import Head from "next/head.js";

const Main = styled.main`
  display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 50%; /* Adjust the width as needed */
  margin-left: 25%;
  margin-right: 25%;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5%;
  background-color: #f1f1f1;
  padding: 1rem;
`;

const LogoImg = styled.img`
  width: 160px; /* Adjust the size as needed */
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tourio</title>
      </Head>
      <TitleBar />
      <Main>
        {children}
      </Main>
      <Footer>
        <LogoImg src="/Tourio-logos_transparent.png" alt="Logo" />
      </Footer>
    </>
  );
}
