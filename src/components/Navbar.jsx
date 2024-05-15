import Navbar from "react-bootstrap/Navbar"

export default function Navbar1() {
    return (
        <header>
            <Navbar className="m-md-3 border-bottom">
                <Navbar.Brand><h1>Buscador Yu-Gi-Oh!</h1></Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text><a className="fs-5" href="https://ygoprodeck.com/api-guide/" target="_blank" rel="noopener noreferrer">API utilizada no projeto.</a></Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}