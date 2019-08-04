import React, { useState} from 'react';
import { 
  Navbar,
  NavbarBrand,
  Collapse,
  Nav,
  NavItem,
  NavbarToggler
} from 'reactstrap'
import { Link } from 'react-router-dom'

const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
      setOpen(!open)
    }
    return (
      <div className='container'>
        <Navbar color='light' light expand='md'>
          <NavbarBrand tag={Link} to='/'>ClimaApstech</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }

  export default Header