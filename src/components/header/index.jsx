import { NavLink, Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { getWeatherCity } from "../../services/weather";

const Header = ({ setSity, sity, setWeather }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link className={"navbar-brand"} to="/">
          Погода
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
              to="/table"
            >
              Таблица
            </NavLink>
            <NavLink
              className={(isActive) =>
                "nav-link" + (!isActive ? " unselected" : "")
              }
              to="/graphic"
            >
              График
            </NavLink>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              getWeatherCity(sity, setWeather);
            }}
          >
            <FormControl
              type="text"
              placeholder="Введите город"
              className="me-2"
              onChange={(e) => setSity(e.target.value)}
            />
            <Button
              tupe="submit"
              onClick={() => getWeatherCity(sity, setWeather)}
              variant="outline-primary"
            >
              Поиск
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
