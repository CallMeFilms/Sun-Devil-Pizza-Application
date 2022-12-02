import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav} from "react-bootstrap";
import {GlobalState} from "../../common/types";
import {useNavigate} from "react-router";

type PageWrapperProps = {
    state: GlobalState,
    updateGlobalState: (newState: GlobalState) => void,
    children: React.ReactNode;
}

function PageWrapper({children, state, updateGlobalState}: PageWrapperProps) {
    const navigate = useNavigate()
    function logout() {
        updateGlobalState({...state, user: undefined})
        navigate("/")
    }
    return (
        <Container fluid>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/"><img src="/asu_logo.png" style={{width:"150px"}} alt={"ASU"}/></Navbar.Brand>
                    <Navbar.Text style={{color:"maroon",textAlign:"center", fontSize:"50px", fontWeight:"bold"}} >SunDevil Pizza </Navbar.Text>
                    <Nav>
                        {state.user && <Nav.Link onClick={logout}>Welcome {state.user.role} Logout</Nav.Link>}
                        {!state.user && <Nav.Link href="/checkout">Checkout</Nav.Link>}
                        {!state.user && <Nav.Link href="/login">Login</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
            {children}
        </Container>
    );
}

export default PageWrapper;
