import { Form } from 'react-bootstrap';

const SimpleInput = () => {
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>answer</Form.Label>
        <Form.Control as="textarea" rows={1} />
      </Form.Group>
    </Form>
  )
}

export default SimpleInput;