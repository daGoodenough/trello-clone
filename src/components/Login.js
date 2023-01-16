import { localLogin } from '../actions/';
import { Card, Form, Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InfoCircle } from 'react-bootstrap-icons';

function Login() {
  const { errorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLocalLogin = (e) => {
    dispatch(localLogin(e, () => {
      navigate('/')
    }))
  }

  return (
    <Container className='mt-5'>
      <Row className="align-items-center justify-content-center">
        <Col md={5}>
          <Card border="secondary" className="shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
            <Card.Body>
              <Card.Title className='text-center'>
                Sign In
              </Card.Title>
              <Form onSubmit={(e) => handleLocalLogin(e)} className='d-flex flex-column'>
                <Form.Group className="m-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="m-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className='align-self-center'>
                  Submit
                </Button>
              </Form>
              {
                (errorMessage === 401 || errorMessage === 404) 
                && <div className='login-error'><InfoCircle/> Incorrect username or password</div>
              }
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Login;

