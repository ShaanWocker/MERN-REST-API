import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px
`

const UsernameForm = (props) => {

return (
    
  <Container>
    <Wrapper>
     <Input 
      placeholder="Username.."
      type='text'
      value={props.username}
      onChange={props.onChange}
     />
     </Wrapper>
     <Wrapper>
     <button className="btn btn-block" onClick={props.connect}>Connect</button>
    </Wrapper>
  </Container>

)
}

export default UsernameForm