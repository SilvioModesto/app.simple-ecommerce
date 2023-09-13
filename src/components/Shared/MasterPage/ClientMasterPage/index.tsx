import { Header } from "./Header";
import { Container } from "./style";

export function ClientMasterPage(props: any) {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
}
