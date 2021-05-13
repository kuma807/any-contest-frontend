import { Form, Button } from 'react-bootstrap';

const SimpleInput = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const id = event.target[0].value;
    const password = event.target[1].value;

    try {
      console.log(`${id} ${password}`);
      const user = await loginService({
        id, password,
      });

      setMessage(`Success: welcome ${id}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      console.log(user);

      setUser({id: id, name: user.name});
      setMessage(`Success: welcome ${user.name}`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      history.push('/');
    } 
    catch (exception) {
      setMessage('Error: wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>answer</Form.Label>
        <Form.Control as="textarea" rows={3} />
        <Button variant="primary" type="submit">
            提出
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SimpleInput;