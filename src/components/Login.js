import { Card, Form, Container, Row, Col, Button, Nav } from 'react-bootstrap';

function Login() {
  return (
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col md={5}>
          <Card border="secondary" className="shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
            <Card.Body>
              <Nav className="justify-content-center mb-4" variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                  <Nav.Link active href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sign-up">Sign-Up</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card.Title className='text-center'>
                Sign In
              </Card.Title>
              <Form className='d-flex flex-column'>
                <Form.Group className="m-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="m-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='align-self-center'>
                  Submit
                </Button>
              </Form>
              <div className='text-center mt-3'>
                or continue with <a href="">Google</a>
              </div>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Login;
