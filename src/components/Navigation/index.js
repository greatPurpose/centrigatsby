import React from "react";
import { Box, Button, Layer as GrommetLayer, ResponsiveContext } from "grommet";
import { StaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";
import { breakpointStyle } from "grommet/utils";
import Container from "../Container";
import { Item, List} from "../List";
import { X } from "styled-icons/feather/X";
import { Menu } from "styled-icons/feather/Menu";
import theme, { breakpoints } from "../Theme/theme";
import { Link } from "gatsby";

const unstyledLinkStyles = css`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:active {
    opacity: 0.9;
  }
`;

const StyledGatsbyLink = styled(Link)`
  ${props => props.unstyled && unstyledLinkStyles}
`;

const NavLink = ({ children, to }) => (
    <StyledGatsbyLink
        style={{ fontWeight: "var(--fw-medium)" }}
        activeStyle={{ color: "var(--c-brand)" }}
        to={to}
    >
        {children}
    </StyledGatsbyLink>
);

const BrandLink = () => (
    <div >BrandLink</div>
);
    
const Nav = styled(Box)`
    z-index: 2000;
    position: sticky;
    -webkit-position: sticky;
    top: 0;
     
     ${breakpointStyle(
    breakpoints.small,
    css`
      top: 1rem;
    `
    )}

    &::after {
        content: "";
        position: absolute;
        background-color: white;
        z-index: -1;
        margin: 0 auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        ${breakpointStyle(
            breakpoints.small,
            css`
            bottom: -1rem;
            top: -1rem;
          `
        )}
      }
    `;

const NavButton = styled(Button)`
    display: none;
    ${breakpointStyle(
        breakpoints.small,
        css`
          display: initial;
        `
    )}
`;

const Dropdowns = styled(Box)`
  ${breakpointStyle(
    breakpoints.small,
    css`
      display: none;
    `
)}

  /* Item (PaddedItem) */
  > li {
    display: block;
    position: relative;

    /* Item:Hover Targeting Dropdown */
    &:hover > ul,
    &:focus-within > ul,
    > ul:hover,
    > ul:focus {
      visibility: visible;
      opacity: 1;
      display: block;
    }
  }

  /* Dropdown Styles */
  > li > ul {
    background-color: #fff;
    box-shadow: ${theme.global.elevation.light.small};
    visibility: hidden;
    opacity: 0;
    padding: 0.5rem 0;
    min-width: 120px;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 1.5rem;
    border-radius: ${theme.global.edgeSize.xsmall};
    left: -16px;
    display: none;

    /* Dropdown Item Styles */
    > li {
      white-space: nowrap;
      width: 100%;
    }

    /* Dropdown Item Link Styles */
    > li > a {
      line-height: 1rem;
      display: block;
      padding: 0.5rem 1rem;
    }
  }
`;

const PaddedItem = styled(Item)`
  padding: 1.5rem 0;
  line-height: 1rem;
`;

const Layer = styled(GrommetLayer)`
  display: none;

  ${breakpointStyle(
    breakpoints.small,
    css`
      display: initial;
    `
)}
`;

class Navigation extends React.Component {
    state = {
        mobileNavIsOpen: false
    };

    toggleMobileNav = () =>
        this.setState({
            mobileNavIsOpen: !this.state.mobileNavIsOpen
        });

    render() {
        return (         
            <Nav as="nav" role="naviagtion">
                <Container>
                    <List style={{ display: "flex", alignItems: "center" }}>
                        <Item style={{ flex: 1 }}><BrandLink /></Item>
                        <NavButton onClick={this.toggleMobileNav}>
                            {this.state.mobileNavIsOpen ? (
                                <X size={32} />
                            ) : (
                                    <Menu size={32} />
                                )}
                        </NavButton>

                        <Dropdowns direction="row" align="center" gap="large">
                            <PaddedItem>
                                <NavLink to="/technology">Technology</NavLink>
                                <List>
                                    <Item>
                                        <NavLink to="/technology/contribute">Contribute</NavLink>
                                    </Item>
                                </List>
                            </PaddedItem>
                            <PaddedItem>
                                <NavLink to="/ecosystem">Ecosystem</NavLink>
                                <List>
                                    <Item>
                                        <NavLink to="/ecosystem/#use-cases">
                                            Use Cases
                                </NavLink>
                                    </Item>
                                </List>
                            </PaddedItem>

                            <PaddedItem>
                                <NavLink to="/news">News</NavLink>
                            </PaddedItem>

                            <PaddedItem>
                                <NavLink to="/about">About</NavLink>
                                <List>
                                    <Item>
                                        <NavLink to="/about/#mission">Mission</NavLink>
                                    </Item>
                                    <Item>
                                        <NavLink to="/about/#team">Team</NavLink>
                                    </Item>
                                    <Item>
                                        <NavLink to="/about/#partners">Partners</NavLink>
                                    </Item>
                                    <Item>
                                        <NavLink to="/careers">Careers</NavLink>
                                    </Item>
                                </List>
                            </PaddedItem>                                        
                        </Dropdowns>
                    </List>
                </Container>
                <MobilePanel
                    state={this.state.mobileNavIsOpen}
                    toggleFunc={this.toggleMobileNav}
                />
            </Nav>
         
       )
    }
}

const MobilePanel = ({ state, toggleFunc }) => (
    <ResponsiveContext.Consumer>
        {size =>
            state &&
            size === "small" && (
                <Layer
                    onClickOutside={toggleFunc}
                    onEsc={toggleFunc}
                    position="top"
                    full="horizontal"
                    responsive={false}
                    animate={true}
                    modal
                >
                    <Box
                        background="white"
                        direction="column"
                        pad={{ top: "xxlarge", bottom: "xlarge" }}
                        gap="medium"
                    >
                        <StyledGatsbyLink to="/technology">Technology</StyledGatsbyLink>
                        <StyledGatsbyLink to="/ecosystem">Ecosystem</StyledGatsbyLink>
                        <StyledGatsbyLink to="/news">News</StyledGatsbyLink>
                        <StyledGatsbyLink to="/about">About</StyledGatsbyLink>
                    </Box>
                </Layer>
            )
        }
    </ResponsiveContext.Consumer>
);

export default Navigation;